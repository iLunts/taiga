import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  invoiceNotification = [
    {
      avatar: './../../../../assets/png/faces/1.png',
      title: 'Invoice created & sent',
      text: 'Monday at 9:15am',
      isActive: false
    },
    {
      avatar: './../../../../assets/png/faces/2.png',
      title: 'Invoice accepted',
      text: 'Monday at 4:55pm',
      isActive: false
    },
    {
      avatar: './../../../../assets/png/faces/3.png',
      title: 'Converted to act',
      text: 'Yesterday at 10:20pm',
      isActive: true
    },
    {
      avatar: './../../../../assets/png/faces/4.png',
      title: 'Invoice sent & delivered',
      text: 'Yesterday at 10:22pm',
      isActive: false
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
