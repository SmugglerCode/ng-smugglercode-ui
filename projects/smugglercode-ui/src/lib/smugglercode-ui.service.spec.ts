import { TestBed } from '@angular/core/testing';

import { SmugglercodeUiService } from './smugglercode-ui.service';

describe('SmugglercodeUiService', () => {
  let service: SmugglercodeUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmugglercodeUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
