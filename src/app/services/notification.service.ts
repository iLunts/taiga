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

  error(message?: string, title?: string): void {
    this.notificationsService
      .show(message || '', {
        label: title || 'Ошибка',
        status: TuiNotification.Error,
        autoClose: true,
        hasCloseButton: true
      })
      .subscribe();
  }

  info(message?: string, title?: string): void {
    this.notificationsService
      .show(message || '', {
        label: title || 'Информация',
        status: TuiNotification.Info,
        autoClose: true,
        hasCloseButton: true
      })
      .subscribe();
  }

  warning(message?: string, title?: string): void {
    this.notificationsService
      .show(message || '', {
        label: title || 'Предупреждение',
        status: TuiNotification.Warning,
        autoClose: true,
        hasCloseButton: true
      })
      .subscribe();
  }
}
