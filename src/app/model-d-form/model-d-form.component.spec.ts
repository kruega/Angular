import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDFormComponent } from './model-d-form.component';

describe('ModelDFormComponent', () => {
  let component: ModelDFormComponent;
  let fixture: ComponentFixture<ModelDFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
