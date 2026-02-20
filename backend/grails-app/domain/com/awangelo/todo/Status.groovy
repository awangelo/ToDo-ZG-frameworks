package com.awangelo.todo

enum Status {
    TODO("ToDo"),
    DOING("Doing"),
    DONE("Done")

    private final String label

    Status(String label) {
        this.label = label
    }
}