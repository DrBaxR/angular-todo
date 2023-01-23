import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // TODO: make theme be remembered between sessions
  dark: boolean = false;

  constructor() { }

  toggleTheme() {
    this.dark = !this.dark;
    document.body.classList.toggle("dark");
  }
}
