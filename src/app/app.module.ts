import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodosComponent } from './components/todos/todos.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { ThemeComponent } from './components/theme/theme.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoCardComponent,
    TodosComponent,
    TodoFormComponent,
    ThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
