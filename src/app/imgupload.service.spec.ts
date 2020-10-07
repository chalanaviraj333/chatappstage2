import { TestBed } from '@angular/core/testing';

import { ImguploadService } from './imgupload.service';

describe('ImguploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImguploadService = TestBed.get(ImguploadService);
    expect(service).toBeTruthy();
  });
});
