import { NgModule } from '@angular/core';
import { TodosComponent } from './components/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { KeycloakRedirectComponent } from './components/keycloak-redirect/keycloak-redirect.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'todos', component: TodosComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: TodoEditComponent, canActivate: [authGuard] },
  { path: 'create', component: TodoCreateComponent, canActivate: [authGuard] },
  { path: 'keycloak', component: KeycloakRedirectComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
