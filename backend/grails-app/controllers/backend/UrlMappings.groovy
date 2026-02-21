package backend

class UrlMappings {

    static mappings = {
        "/tarefas"(resources: 'tarefa')

        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
