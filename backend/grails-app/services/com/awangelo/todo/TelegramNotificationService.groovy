package com.awangelo.todo

import groovy.json.JsonOutput
import org.springframework.beans.factory.annotation.Value

import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

// Mensagem nao precisa de rollback caso notificacao falhe.
//@Transactional
class TelegramNotificationService {

    @Value('${telegram.botToken}')
    String botToken
    @Value('${telegram.chatId}')
    String chatId

    void sendNotification(String mensagem) {
        String url = "https://api.telegram.org/bot${botToken}/sendMessage"

        def payload = [
                chat_id: chatId,
                text   : mensagem
        ]

        String jsonBody = JsonOutput.toJson(payload)

        HttpClient client = HttpClient.newHttpClient()
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build()

        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenAccept { response ->
                    if (response.statusCode() != 200) {
                        log.error("Falha ao enviar notificação para o Telegram. HTTP Status: ${response.statusCode()} - Body: ${response.body()}")
                    }
                }
                .exceptionally { ex ->
                    log.error("Exceção ao comunicar com a API do Telegram", ex)
                    return null
                }
    }
}
