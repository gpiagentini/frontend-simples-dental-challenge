import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Credentials } from '../../objects/Credentials';
import { Router } from '@angular/router';
import { LoginData } from '../../objects/LoginData';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private readonly _snackBar = inject(MatSnackBar);

  public login: string = '';
  public password: string = '';


  constructor(private readonly router: Router) {
  }

  /*
    - Saves the default credentials in the local storage.
    - Checks if if we have any valid login data stored.
  */
  ngOnInit(): void {
    if (localStorage.getItem('credentials') === null)
      localStorage.setItem('credentials', JSON.stringify(new Credentials('admin', 'admin')));
    if (localStorage.getItem('loginData') !== null) {
      const loginData: LoginData = JSON.parse(localStorage.getItem('loginData')!);
      if (loginData.expirationTime < new Date().getTime()) {
        localStorage.removeItem('loginData');
      } else {
        this.router.navigate(['/albums']);
      }
    }
  }

  /*
    - Save the login data in the local storage and navigate to the albums page, if credentials are correct.
  */
  doLogin() {
    const localCredentailsJson: string | null = localStorage.getItem('credentials');
    if (localCredentailsJson) {
      const credentials: Credentials = JSON.parse(localCredentailsJson);
      if (credentials.login === this.login && credentials.password === this.password) {
        this._snackBar.open('Login efetuado com sucesso!', 'Fechar', { duration: 2000, });
        let expirationTime = new Date().getTime() + 1000 * 60 * 10; // 10 minutes
        localStorage.setItem('loginData', JSON.stringify(new LoginData(this.login, expirationTime)));
        this.router.navigate(['/albums']);
      }
      else
        this._snackBar.open('Login ou senha incorretos!', 'Fechar', { duration: 2000, });
    }
    else
      this._snackBar.open('Credenciais não encontradas! Favor contatar o suporte.', 'Fechar', { duration: 2000, });
  }

}
