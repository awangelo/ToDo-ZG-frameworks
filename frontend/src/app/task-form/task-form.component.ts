import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Status, Prioridade, Tarefa} from '../models';
import { TarefaService } from '../services/tarefa.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  isEdit: boolean = false;
  tarefaId?: number;

  statusOptions: Status[] = Object.values(Status);
  prioridadeOptions: Prioridade[] = Object.values(Prioridade);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefaService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(20)]],
      descricao: ['', [Validators.maxLength(200)]],
      dataLimite: [''],
      status: [Status.TODO, [Validators.required]],
      prioridade: [Prioridade.MEDIA, [Validators.required]],
    });

    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tarefaId = Number(id);
      this.tarefaService.buscarPorId(this.tarefaId).subscribe({
        next: (tarefa) => {
          this.form.patchValue({
            titulo: tarefa.titulo,
            descricao: tarefa.descricao || '',
            dataLimite: tarefa.dataLimite ? tarefa.dataLimite.substring(0, 16) : '',
            status: tarefa.status,
            prioridade: tarefa.prioridade,
          });
        },
        error: (err) => console.error('Erro ao carregar tarefa:', err)
      });
    } else {
      const statusParam: string | null = this.route.snapshot.queryParamMap.get('status');
      if (statusParam && Object.values(Status).includes(statusParam as Status)) {
        this.form.patchValue({ status: statusParam });
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const payload = {
      ...formValue,
      dataLimite: formValue.dataLimite ? formValue.dataLimite + ':00' : null,
      descricao: formValue.descricao || null,
    };

    const request$: Observable<Tarefa> = this.isEdit
      ? this.tarefaService.atualizar(this.tarefaId!, payload)
      : this.tarefaService.criar(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error('Erro ao salvar tarefa:', err)
    });
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}
