import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/Settings'
import { SettingsService } from 'src/app/services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  setting: Settings

  constructor(
    private settingsService : SettingsService,
    private flashMessage : FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.setting = this.settingsService.getSettings();
  }

  onSumbit(){
    this.settingsService.changeSettings(this.setting);
    this.flashMessage.show('Settings updated successfully!',{cssClass: 'alert-success', timeout: 4000});
  }

}
