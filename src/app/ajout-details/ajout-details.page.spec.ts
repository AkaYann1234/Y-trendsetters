import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutDetailsPage } from './ajout-details.page';

describe('AjoutDetailsPage', () => {
  let component: AjoutDetailsPage;
  let fixture: ComponentFixture<AjoutDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
