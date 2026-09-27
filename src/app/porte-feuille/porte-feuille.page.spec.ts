import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PorteFeuillePage } from './porte-feuille.page';

describe('PorteFeuillePage', () => {
  let component: PorteFeuillePage;
  let fixture: ComponentFixture<PorteFeuillePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PorteFeuillePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
