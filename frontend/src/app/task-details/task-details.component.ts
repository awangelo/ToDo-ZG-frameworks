import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa } from '../models';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  tarefa?: Tarefa;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tarefaService.buscarPorId(id).subscribe({
      next: (tarefa) => this.tarefa = tarefa,
      error: () => this.tarefa = undefined
    });
  }

  excluir(): void {
    if (!this.tarefa?.id) return;
    this.tarefaService.excluir(this.tarefa.id).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error('Erro ao excluir:', err)
    });
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}
