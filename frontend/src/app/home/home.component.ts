import { Component, OnInit } from '@angular/core';
import { Tarefa, Status } from '../models';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Status = Status;
  tarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.listar().subscribe({
      next: (tarefas) => this.tarefas = tarefas,
      error: (err) => console.error('Erro ao carregar tarefas:', err)
    });
  }

  get todoTarefas(): Tarefa[] {
    return this.tarefas.filter(t => t.status === Status.TODO);
  }

  get doingTarefas(): Tarefa[] {
    return this.tarefas.filter(t => t.status === Status.DOING);
  }

  get doneTarefas(): Tarefa[] {
    return this.tarefas.filter(t => t.status === Status.DONE);
  }
}
