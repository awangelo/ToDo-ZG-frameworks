import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: HomeComponent },
  // { path: 'tarefas/nova', component: TaskFormComponent },
  // { path: 'tarefas/editar/:id', component: TaskFormComponent },
  // { path: 'tarefas/:id', component: TaskDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
