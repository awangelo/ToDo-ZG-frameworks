package com.awangelo.todo

import java.time.LocalDateTime

class Tarefa {
    String titulo
    String descricao
    LocalDateTime dataLimite
    Status status = Status.TODO
    Prioridade prioridade = Prioridade.MEDIA

    static constraints = {
        titulo blank: false, size: 1..20
        descricao nullable: true, maxSize: 200
        dataLimite nullable: true, validator: { data, ignored ->
            if (data == null) return true
            data >= LocalDateTime.now()
        }
    }

    static mapping = {
        table 'tarefas'
        sort id: 'asc'
    }
}
