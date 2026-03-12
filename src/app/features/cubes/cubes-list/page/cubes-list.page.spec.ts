import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CubesListPage } from './cubes-list.page';

describe('CubesListPage', () => {
  let component: CubesListPage;
  let fixture: ComponentFixture<CubesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubesListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CubesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
