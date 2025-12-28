import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellArticlePage } from './sell-article.page';

describe('SellArticlePage', () => {
  let component: SellArticlePage;
  let fixture: ComponentFixture<SellArticlePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SellArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
