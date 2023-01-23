import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  dark: boolean = false;

  constructor() { }

  toggleTheme() {
    this.dark = !this.dark;
    document.body.classList.toggle("dark");
  }
}
