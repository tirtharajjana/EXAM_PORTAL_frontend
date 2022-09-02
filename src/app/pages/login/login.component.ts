import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }



  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  formSubmit() {
    // alert(JSON.stringify(this.loginData));
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required', '', { duration: 2000 });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required', '', { duration: 2000 });
      return;
    }

    //request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        console.log("token generated");

        //login
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            console.log(user);
            this.loginService.setUser(user);
            if (this.loginService.getUserRole() == 'ADMIN') {
              //redirect ADMIN to admin page
              this.router.navigate(['/admin']);
              // window.location.href = '/admin';
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              //redirect USER to user page
              this.router.navigate(['/user-dashboard']);
              // window.location.href = '/user-dashboard';
            } else {
              this.loginService.logoutUser();
            }
          }

        )
      },
      (err) => {
        console.log(err);
        this.snack.open('Invalid details!! Try again', '', { duration: 2000 });
      }
    )

  }

  ngOnInit(): void {
  }

}
