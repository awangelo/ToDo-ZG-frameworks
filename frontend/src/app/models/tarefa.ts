import { Status } from './status.enum';
import { Prioridade } from './prioridade.enum';

export interface Tarefa {
  id?: number;
  titulo: string;
  descricao?: string;
  dataLimite?: string;
  status: Status;
  prioridade: Prioridade;
}
