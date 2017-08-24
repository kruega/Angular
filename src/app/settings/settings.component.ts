import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { User } from '../services/login-service/login-service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  readOnly = true;
  constructor(private activatedRoute: ActivatedRoute,
              private titleService: Title) {
                const user: User = activatedRoute.snapshot.data['user'];
                if (user.hasRight('change_settings')) {
                  console.log('User is allowed to change settings');
                  this.readOnly = false;
                }
               }

  ngOnInit() {
    const title = this.activatedRoute.snapshot.data['title'];
    if (title) {
      this.titleService.setTitle(title);
    }
  }

}
