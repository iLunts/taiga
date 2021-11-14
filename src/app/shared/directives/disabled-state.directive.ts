import {
  Directive,
  OnDestroy,
  Input,
  EventEmitter,
  HostListener,
  Renderer2,
  ElementRef,
  OnInit,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[disabledState]'
})
export class DisabledStateDirective implements OnInit, OnDestroy {
  @Input('disabledState') reenableButton: EventEmitter<boolean>;
  @Output('disabledState') reenableButtonChange = new EventEmitter<boolean>();
  subscription: Subscription;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    this.setProperties();
  }

  ngOnInit(): void {
    this.subscription = this.reenableButton
      .pipe(
        tap((value) =>
          value ? this.setProperties() : this.removeProperties()
        ),
        tap((value) => console.log('Got the value as ', value))
      )
      .subscribe();
  }

  setProperties(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    this.renderer.addClass(this.el.nativeElement, '_disabled-loader');
  }

  removeProperties(): void {
    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    this.renderer.removeClass(this.el.nativeElement, '_disabled-loader');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
