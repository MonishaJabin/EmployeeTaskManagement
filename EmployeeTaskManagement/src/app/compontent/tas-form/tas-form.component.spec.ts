import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasFormComponent } from './tas-form.component';

describe('TasFormComponent', () => {
  let component: TasFormComponent;
  let fixture: ComponentFixture<TasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
