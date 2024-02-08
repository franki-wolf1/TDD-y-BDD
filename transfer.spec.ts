import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransferService } from './transfer.service';

describe('TransferService', () => {
  let transferService: TransferService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransferService]
    });

    transferService = TestBed.inject(TransferService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(transferService).toBeTruthy();
  });

  it('should send transfer request', () => {
    const transferData = { amount: 100, recipient: '123456', description: 'Transfer' };
    const expectedResponse = { success: true };

    transferService.transfer(transferData).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne('/api/transfer');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(transferData);
    req.flush(expectedResponse);
  });

  it('should handle insufficient balance', () => {
    const transferData = { amount: 1000, recipient: '123456', description: 'Transfer' };
    const errorMessage = 'Insufficient balance';

    transferService.transfer(transferData).subscribe({
      next: () => fail('Expected an error, but transfer succeeded'),
      error: error => {
        expect(error).toEqual(errorMessage);
      }
    });

    const req = httpTestingController.expectOne('/api/transfer');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('server-error'), { status: 400, statusText: 'Bad Request' });
  });

  it('should apply commission fee', () => {
    const transferData = { amount: 100, recipient: '123456', description: 'Transfer' };
    const commissionRate = 0.02;
    const expectedCommission = transferData.amount * commissionRate;
    const expectedResponse = { success: true };

    transferService.transfer(transferData).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne('/api/transfer');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);

    expect(transferService.commission).toEqual(expectedCommission);
  });

  // Otras pruebas para validar casos de borde, errores, etc.
});
