import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransferService } from './transfer.service';
/*
 ejemplo más completo de pruebas unitarias utilizando Jasmine para un servicio de transferencia 
 bancaria en Angular. Este ejemplo aborda varios escenarios posibles, como la validación de 
 datos de entrada, el cálculo de comisiones y la verificación de saldo suficiente en la cuenta 
 del remitente:
........................................................................................................*/
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
  
/*
En esta sección, importamos las herramientas necesarias para realizar las pruebas: TestBed, inject, 
HttpClientTestingModule y HttpTestingController. Configuramos el módulo de pruebas de Angular 
(TestBed.configureTestingModule), importando HttpClientTestingModule para simular peticiones HTTP.
Creamos instancias del servicio TransferService y del controlador HttpTestingController utilizando TestBed.inject.
Utilizamos afterEach para verificar que no haya solicitudes HTTP pendientes después de cada prueba.
.........................................................................................................*/

  it('should be created', () => {
    expect(transferService).toBeTruthy();
  });
  /*Esta prueba simplemente verifica que el servicio de transferencia se haya creado correctamente.*/

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
  /*Esta prueba verifica que el servicio envíe correctamente una solicitud de transferencia al servidor con los 
  datos adecuados y maneje la respuesta esperada.*/
  
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
  /*Esta prueba simula un caso de error de saldo insuficiente y verifica que el servicio maneje correctamente 
  este escenario.*/


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
  /*Esta prueba verifica que el servicio aplique correctamente la tarifa de comisión en la transferencia.*/

  // Otras pruebas para validar casos de borde, errores, etc.
});
