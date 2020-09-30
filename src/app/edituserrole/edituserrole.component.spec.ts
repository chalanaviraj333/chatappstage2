import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserroleComponent } from './edituserrole.component';

describe('EdituserroleComponent', () => {
  let component: EdituserroleComponent;
  let fixture: ComponentFixture<EdituserroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
