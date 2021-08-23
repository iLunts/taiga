import { Component } from '@angular/core';
// import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'taiga';
  message: any;

  constructor() {
    // private messagingService: MessagingService
    // const userId = 'J4ZJLdwmL2TBmIEdvbT8AnkUrc82';
    // this.messagingService.requestPermission(userId);
    // this.messagingService.receiveMessage();
    // this.message = this.messagingService.currentMessage;
  }
}
