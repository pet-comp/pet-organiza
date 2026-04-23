import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHabitPage } from './new-habit.page';

describe('NewHabitPage', () => {
  let component: NewHabitPage;
  let fixture: ComponentFixture<NewHabitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHabitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
