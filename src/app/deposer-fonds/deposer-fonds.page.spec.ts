import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeposerFondsPage } from './deposer-fonds.page';

describe('DeposerFondsPage', () => {
  let component: DeposerFondsPage;
  let fixture: ComponentFixture<DeposerFondsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeposerFondsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
