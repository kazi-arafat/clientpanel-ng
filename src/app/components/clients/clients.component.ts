import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients : Client[]
  totalOwed : number;
  contentLoaded : boolean = false;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(resp => {
      this.clients = resp;
      this.totalOwed = this.getTotalOwed();
      this.contentLoaded = true;
    }, err => {
      console.log(err);
      this.contentLoaded = true;
    });
    
  }

  getTotalOwed(){
    return this.clients.reduce((total,user) =>{
      // console.log(user.balance);
      return total + user.balance;
    },0);
    // return total;
  }

}
