import { Component, OnInit,ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client : Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disabledBalanceOnAdd : boolean;
  @ViewChild('addClientForm') form:any;


  constructor(
    private flashMessage : FlashMessagesService,
    private clientService : ClientService,
    private route : Router,
    private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
    this.disabledBalanceOnAdd = this.settingsService.getSettings().disabledBalanceOnAdd;
  }

  onSubmit({value,valid}:{value:Client,valid:boolean}) {
    console.log(value,valid);
    if(this.disabledBalanceOnAdd){
      value.balance = 0;
    }
    if (!valid) {
      // this.form.markAsDirty();
      // alert("Pleasae check erors!");
      //show flash message
      this.flashMessage.show('Please check the errors.',{
        cssClass: 'alert-danger', timeout: 4000
      });
      // make input field as touched
      // const ngClass = ['is-invalid'];
    } else {   
      // add new client
      this.clientService.newClient(value);
      // diplay success message
      this.flashMessage.show('Client added successfully.',{
        cssClass: 'alert-success', timeout: 2000
      });
      // redirect to dashboard
      this.route.navigate(['/']);
    }
  }
}