import { Component, Input } from '@angular/core';
import { Tarefa, Status } from '../models';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  @Input() title: string = '';
  @Input() color: string = '';
  @Input() tarefas: Tarefa[] = [];
  @Input() status: Status = Status.TODO;
}
