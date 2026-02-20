package com.awangelo.todo

enum Prioridade {
    MUITO_BAIXA("Muito Baixa"),
    BAIXA("Baixa"),
    MEDIA("Média"),
    ALTA("Alta"),
    MUITO_ALTA("Muito Alta")

    private final String label

    Prioridade(String label) {
        this.label = label
    }
}