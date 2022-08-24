import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }


  formSubmit() {
    // alert("Form Submitted");
    if (this.user.username == "" || this.user.username == null) {
      this.snack.open("Username is required", "ok", { duration: 2000 });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire("Success","User registered successfully",'success');
        // Swal.fire()
      },
      (error) => {
        console.log(error);
        this.snack.open("Something went wrong", "ok", { duration: 2000 });
      }
    )

  }

}
