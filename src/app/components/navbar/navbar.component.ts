import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:any = null;
  isUserLoggedIn = false;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.isUserLoggedIn = this.loginService.isLoggedin();
    this.loginService.loginStatusSubject.asObservable().subscribe(data => {
      this.user = this.loginService.getUser();
      this.isUserLoggedIn = this.loginService.isLoggedin();
    })
  }

  logout() {
    this.loginService.logoutUser();
    location.reload();

  }

}
