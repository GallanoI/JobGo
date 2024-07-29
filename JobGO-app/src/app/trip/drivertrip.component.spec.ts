import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTripComponent } from './drivertrip.component';

describe('DriverTripComponent', () => {
  let component: DriverTripComponent;
  let fixture: ComponentFixture<DriverTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
