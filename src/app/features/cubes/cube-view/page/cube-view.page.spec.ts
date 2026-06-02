import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CubeViewPage } from '../page/cube-view.page';

describe('CubeViewPage', () => {
  let component: CubeViewPage;
  let fixture: ComponentFixture<CubeViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
