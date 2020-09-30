import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusertochannelComponent } from './addusertochannel.component';

describe('AddusertochannelComponent', () => {
  let component: AddusertochannelComponent;
  let fixture: ComponentFixture<AddusertochannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddusertochannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddusertochannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
