import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeMockService {
  dark: boolean = false;

  toggleTheme() {
    this.dark = !this.dark;
  }
}
