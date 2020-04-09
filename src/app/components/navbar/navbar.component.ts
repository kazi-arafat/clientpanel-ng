import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn : boolean;
  showRegister: boolean;
  loggedInUser: string;
  constructor(
    private flashMessage : FlashMessagesService,
    private router: Router,
    private authService : AuthService,
    private settingsService : SettingsService
  ) { }

  ngOnInit(): void {
    this.showRegister = this.settingsService.getSettings().allowRegistration;
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLoggedIn = false;
      }
    });
  }

  onLogOutClick(){
    this.authService.logOut();
    this.flashMessage.show('Logged out Successfully!',{cssClass:'alert-success', timeout: 4000});
    this.router.navigate(['/login']);
  }

}
