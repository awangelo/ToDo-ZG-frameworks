package com.awangelo.todo


import grails.rest.*
import grails.converters.*

class TarefaController extends RestfulController {
    static responseFormats = ['json']

    TarefaController() {
        super(Tarefa)
    }
}
