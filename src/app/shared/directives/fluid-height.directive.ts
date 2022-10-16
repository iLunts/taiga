import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[fluidHeight]'
})
export class FluidHeightDirective implements AfterViewInit {
  @Input() minHeight: number;
  @Input('fluidHeight') topOffset: number;

  private domElement: HTMLElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.domElement = this.elementRef.nativeElement as HTMLElement;

    // register on window resize event
    fromEvent(window, 'resize')
      .pipe(throttleTime(500), debounceTime(500))
      .subscribe(() => this.setHeight());
  }

  ngAfterViewInit(): void {
    this.setHeight();
  }

  private setHeight(): void {
    const windowHeight = window?.innerHeight;
    const topOffset = this.topOffset || this.calcTopOffset();
    let height = windowHeight - topOffset;

    // set min height instead of the calculated
    if (this.minHeight && height < this.minHeight) {
      height = this.minHeight;
    }

    this.renderer.setStyle(this.domElement, 'height', `${height}px`);
  }

  private calcTopOffset(): number {
    try {
      const rect = this.domElement.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      return rect.top + scrollTop;
    } catch (e) {
      return 0;
    }
  }
}
