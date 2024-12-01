import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkrainianPaginatorComponent } from './ukrainian-paginator.component';

describe('UkrainianPaginatorComponent', () => {
  let component: UkrainianPaginatorComponent;
  let fixture: ComponentFixture<UkrainianPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UkrainianPaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkrainianPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
