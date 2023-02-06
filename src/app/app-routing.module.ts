import { NgModule } from '@angular/core';
import { TodosComponent } from './components/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';

const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'edit/:id', component: TodoEditComponent },
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
