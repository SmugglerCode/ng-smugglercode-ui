import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmugglercodeUiComponent } from './smugglercode-ui.component';

describe('SmugglercodeUiComponent', () => {
  let component: SmugglercodeUiComponent;
  let fixture: ComponentFixture<SmugglercodeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmugglercodeUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmugglercodeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
