import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryItemPage } from './category-item.page';

describe('CategoryItemPage', () => {
  let component: CategoryItemPage;
  let fixture: ComponentFixture<CategoryItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoryItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
