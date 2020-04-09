import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessage : FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.router.navigate(["/"]);
      }
    });


  }

  onSubmit({value,valid}:{value:{email: string, password: string},valid:boolean}){
    if (!valid) {
      console.log("Not Valid");
    } else {
      console.log(value.email,value.password);
      this.authService.login(this.email,this.password)
        .then( resp => {
          this.flashMessage.show('You are logged in successfully!',{ cssClass: 'alert-success', timeout: 4000});
          this.router.navigate(["/"]);
        })
        .catch( err => {
          console.log(err);
          this.flashMessage.show(err.message,{ cssClass: 'alert-danger', timeout: 4000});
        })
  }
  }
}
