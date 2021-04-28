import { Inject, Injectable } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {}

  success(message?: string, title?: string): void {
    this.notificationsService
      .show(message || '', {
        label: title || 'Успешно',
        status: TuiNotification.Success,
        autoClose: true,
        hasCloseButton: true
      })
      .subscribe();
  }
}
