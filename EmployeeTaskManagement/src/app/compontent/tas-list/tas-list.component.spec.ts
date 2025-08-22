import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasListComponent } from './tas-list.component';

describe('TasListComponent', () => {
  let component: TasListComponent;
  let fixture: ComponentFixture<TasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
