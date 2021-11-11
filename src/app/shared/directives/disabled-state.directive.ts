import {
  Directive,
  OnDestroy,
  Input,
  EventEmitter,
  HostListener,
  Renderer2,
  ElementRef,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDisabledState]'
})
export class DisabledStateDirective implements OnInit, OnDestroy {
  @Input('appDisabledState') reenableButton: EventEmitter<boolean>;
  subscription: Subscription;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
  }

  ngOnInit(): void {
    this.subscription = this.reenableButton.subscribe((value: any) => {
      console.log('Got the value as ', value);
      if (!value) {
        this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
