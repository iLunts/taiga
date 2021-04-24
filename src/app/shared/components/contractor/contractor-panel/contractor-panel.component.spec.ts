import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPanelComponent } from './contractor-panel.component';

describe('ContractorPanelComponent', () => {
  let component: ContractorPanelComponent;
  let fixture: ComponentFixture<ContractorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
