import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetirerFondsPage } from './retirer-fonds.page';

describe('RetirerFondsPage', () => {
  let component: RetirerFondsPage;
  let fixture: ComponentFixture<RetirerFondsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirerFondsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
