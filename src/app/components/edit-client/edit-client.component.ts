import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router, Params  } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client : Client = {
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0,
  };
  id: string;
  disalebalanceOnEdit: boolean;

  // @ViewChild('addClientForm') form:any;


  constructor(
    private clientService: ClientService,
    private router : Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    // set balance field settings
    this.disalebalanceOnEdit = this.settingsService.getSettings().disabledbalanceOnEdit;
    // get id from url
    this.id =this.route.snapshot.params['id'];
    // Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null){
        this.client = client;
      }
      console.log(this.client);
    }
      ,err => console.log(err))
  }

  onSubmit({value,valid}:{value:Client,valid:boolean}){
    if (!valid) {
      this.flashMessage.show('Please check errors!',{
        cssClass:'alert-danger',timeout:4000
      });
    }else{
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessage.show('Client updated successfully!',{
        cssClass:'alert-success',timeout:4000
      });
      this.router.navigate(['/']);
    }

  }

}
