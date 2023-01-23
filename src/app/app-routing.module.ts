import { NgModule } from '@angular/core';
import { TodosComponent } from './components/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'edit/:id', component: TodoFormComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  // TODO: 404 route
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
