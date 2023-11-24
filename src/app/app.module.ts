import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodosComponent } from './components/todos/todos.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { authInterceptor } from './interceptor/auth.interceptor';

export const BASE_URL = new InjectionToken<string>('BaseUrl');

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoCardComponent,
    TodosComponent,
    TodoEditComponent,
    TodoFormComponent,
    TodoCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    { provide: BASE_URL, useValue: environment.baseUrl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
