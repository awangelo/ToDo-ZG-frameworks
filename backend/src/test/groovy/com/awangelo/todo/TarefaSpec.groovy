package com.awangelo.todo

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

import java.time.LocalDateTime

class TarefaSpec extends Specification implements DomainUnitTest<Tarefa> {

    void "rejeita tarefa com titulo nulo"() {
        when: "uma tarefa eh instanciada com o titulo em nulo"
        Tarefa tarefa = new Tarefa(
                titulo: "",
                descricao: "Descricao",
                dataLimite: LocalDateTime.now().plusDays(1),
                prioridade: Prioridade.ALTA
        )

        then: "deve ser invalida"
        !tarefa.validate()
        tarefa.errors['titulo'].code == 'nullable'
    }

    void "rejeita tarefa com titulo em branco"() {
        when: "uma tarefa eh instanciada com o titulo em branco"
        Tarefa tarefa = new Tarefa(
                titulo: "   ",
                descricao: "Descricao",
                dataLimite: LocalDateTime.now().plusDays(1)
        )

        then: "deve ser invalida"
        !tarefa.validate()
        tarefa.errors['titulo'].code == 'nullable'
    }

    void "rejeita tarefa com titulo com mais de 20 caracteres"() {
        when: "uma tarefa eh instanciada com mais de 20 caracteres no titulo"
        Tarefa tarefa = new Tarefa(
                titulo: "A".multiply(21),
                descricao: "Descricao",
                dataLimite: LocalDateTime.now().plusDays(1)
        )

        then: "deve ser invalida"
        !tarefa.validate()
        tarefa.errors['titulo'].code == 'size.toobig'
    }

    void "aceita tarefa com descricao nula"() {
        when: "uma tarefa eh instanciada com descricao nula"
        Tarefa tarefa = new Tarefa(
                titulo: "Reuniao",
                descricao: null,
                dataLimite: LocalDateTime.now().plusDays(1)
        )

        then: "deve ser valida"
        tarefa.validate()
    }

    void "rejeita tarefa com descricao com mais de 200 caracteres"() {
        when: "uma tarefa eh instanciada com mais de 200 caracteres na descricao"
        Tarefa tarefa = new Tarefa(
                titulo: "Reuniao",
                descricao: "A".multiply(201),
                dataLimite: LocalDateTime.now().plusDays(1)
        )

        then: "deve ser invalida"
        !tarefa.validate()
        tarefa.errors['descricao'].code == 'maxSize.exceeded'
    }

    void "aceita tarefa com dataLimite nula"() {
        when: "uma tarefa eh instanciada com dataLimite nula"
        Tarefa tarefa = new Tarefa(
                titulo: "Reuniao",
                descricao: "Descricao",
                dataLimite: null
        )

        then: "deve ser valida"
        tarefa.validate()
    }

    void "rejeita tarefa com dataLimite no passado"() {
        when: "uma data no passado e atribuida"
        Tarefa tarefa = new Tarefa(
                titulo: 'Reuniao',
                dataLimite: LocalDateTime.now().minusDays(1)
        )

        then: "a validacao deve falhar no validador customizado"
        !tarefa.validate()
        tarefa.errors['dataLimite'].code == 'validator.invalid'
    }
}
