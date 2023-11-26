import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-keycloak-redirect',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>logging in, please wait...</p>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeycloakRedirectComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let i = window.location.href.indexOf('code');
    if (i != -1) {
      this.auth.retrieveToken(window.location.href.substring(i + 5)).subscribe(() => this.router.navigate(['todos']));
    }
  }
}
