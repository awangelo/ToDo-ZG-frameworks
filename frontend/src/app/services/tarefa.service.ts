import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private readonly API_URL = '/tarefas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.API_URL}/${id}`);
  }

  criar(tarefa: Partial<Tarefa>): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.API_URL, tarefa);
  }

  atualizar(id: number, tarefa: Partial<Tarefa>): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.API_URL}/${id}`, tarefa);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

