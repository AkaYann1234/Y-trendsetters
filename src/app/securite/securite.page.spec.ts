import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecuritePage } from './securite.page';

describe('SecuritePage', () => {
  let component: SecuritePage;
  let fixture: ComponentFixture<SecuritePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
