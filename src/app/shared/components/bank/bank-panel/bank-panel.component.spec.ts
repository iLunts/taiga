import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankPanelComponent } from './bank-panel.component';

describe('BankPanelComponent', () => {
  let component: BankPanelComponent;
  let fixture: ComponentFixture<BankPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
