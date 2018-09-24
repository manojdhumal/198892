import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CservicesComponent } from './cservices.component';

describe('CservicesComponent', () => {
  let component: CservicesComponent;
  let fixture: ComponentFixture<CservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
