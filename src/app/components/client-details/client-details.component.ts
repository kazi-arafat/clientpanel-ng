import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params  } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client : Client;
  id: string;
  hasBalance : boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router : Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
    // get id from url
    this.id =this.route.snapshot.params['id'];
    // Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
        this.client = client;
      }
      console.log(this.client);
    }
      ,err => console.log(err))
  }
  
  // Delete Client
  onDeleteClick(){
    if (confirm(`Are you sure to delete ${this.client.firstName} ${this.client.lastName}?`)) {
      console.log("Client delete");
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client deleted successfully!',{
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

  // Update Balance
  updateBalance(){
    console.log("Balance Update");
    this.clientService.updateClient(this.client);
    if (this.client.balance > 0) {  
      this.hasBalance = true;
    }else{
      this.hasBalance = false;
    }

    this.flashMessage.show('Balance updated!',{
      cssClass:'alert-success',timeout:4000
    });
    // to hide form
    this.showBalanceUpdateInput = !this.showBalanceUpdateInput;
  }

  

}
