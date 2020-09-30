import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveuserchannelComponent } from './removeuserchannel.component';

describe('RemoveuserchannelComponent', () => {
  let component: RemoveuserchannelComponent;
  let fixture: ComponentFixture<RemoveuserchannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveuserchannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveuserchannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
