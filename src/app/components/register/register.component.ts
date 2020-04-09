import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitregisterForm({value,valid}:{value:{email: string, password: string},valid:boolean}){
    if (!valid) {
      console.log("Not Valid");
    } else {
      console.log(value.email,value.password);
      this.authService.register(this.email,this.password)
        .then( resp => {
          this.flashMessage.show('Regestration Successful!',{ cssClass: 'alert-success', timeout: 4000});
          this.router.navigate(['/login']);
        })
        .catch( err => {
          console.log(err);
          this.flashMessage.show(err.message,{ cssClass: 'alert-danger', timeout: 4000});
        })
  }
  }
}
