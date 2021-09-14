import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUnpComponent } from './company-unp.component';

describe('CompanyUnpComponent', () => {
  let component: CompanyUnpComponent;
  let fixture: ComponentFixture<CompanyUnpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUnpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUnpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
