import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpenceComponent } from './update-expence.component';

describe('UpdateExpenceComponent', () => {
  let component: UpdateExpenceComponent;
  let fixture: ComponentFixture<UpdateExpenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateExpenceComponent]
    });
    fixture = TestBed.createComponent(UpdateExpenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
