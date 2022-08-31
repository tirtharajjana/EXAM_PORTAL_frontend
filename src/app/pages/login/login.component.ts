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



  constructor(private snack: MatSnackBar, private loginService: LoginService) { }

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
      },
      (err) => {
        console.log(err);
        this.snack.open('Something went wrong', '', { duration: 2000 });
      }
    )

  }

  ngOnInit(): void {
  }

}
