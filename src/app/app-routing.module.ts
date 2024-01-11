import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'create', component: CreateTodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
