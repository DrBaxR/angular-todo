import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  errorMessage: string = '';
  inProgress: boolean = false;

  loggedInUsername: string | undefined = undefined;

  constructor(private authService: AuthService) {
    this.authService.loggedInUser.subscribe(value => {
      this.loggedInUsername = value;
    })
  }

  ngOnInit(): void {
    this.onLogout();
  }

  isLoggedIn() {
    return this.loggedInUsername !== undefined;
  }

  onLogin() {
    this.inProgress = true;
    this.errorMessage = '';
    this.authService.login(this.username, this.password).subscribe(
      {
        next: () => {
          this.inProgress = false;
        },
        error: (error) => {
          console.log(error);
          this.inProgress = false;
          this.errorMessage = error.message;
        }
      }
    );
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.inProgress = false;
      },
      error: (error) => {
        console.log(error);
        this.inProgress = false;
        this.errorMessage = error.message;
      }
    });
  }
}
