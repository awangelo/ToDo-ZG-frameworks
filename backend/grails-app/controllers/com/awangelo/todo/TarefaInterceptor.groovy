package com.awangelo.todo

class TarefaInterceptor {

    TelegramNotificationService telegramNotificationService

    TarefaInterceptor() {
        match controller: 'tarefa', action: 'save'
    }

    boolean after() {
        if (response.status == 201) {
            Tarefa tarefaSalva = model?.tarefa as Tarefa

            telegramNotificationService.sendNotification("Tarefa ${tarefaSalva.titulo} criada com status ${tarefaSalva.status} e prioridade ${tarefaSalva.prioridade}.")
        }

        return true
    }
}
