import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveuserfromgroupComponent } from './removeuserfromgroup.component';

describe('RemoveuserfromgroupComponent', () => {
  let component: RemoveuserfromgroupComponent;
  let fixture: ComponentFixture<RemoveuserfromgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveuserfromgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveuserfromgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
