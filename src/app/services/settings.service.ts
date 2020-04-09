import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  settings: Settings;

  constructor() { 
    if (localStorage.getItem('setting') != null) {
      this.settings = JSON.parse(localStorage.getItem('setting'));
    }
  }

  getSettings() : Settings{
    return this.settings;
  }

  changeSettings(currentSetting:Settings){
    console.log('Updating settings in localStorage',currentSetting);
    localStorage.setItem('setting',JSON.stringify(currentSetting));
  }
}
