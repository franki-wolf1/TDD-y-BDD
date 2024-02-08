describe('TransferService', () => {
  let service: TransferService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new TransferService(httpClientSpy as any);
  });

  it('should send transfer request', () => {
    const transferData = { amount: 100, recipient: '123456', description: 'Transfer' };
    const expectedResponse = { success: true };
    httpClientSpy.post.and.returnValue(of(expectedResponse));

    service.transfer(transferData).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

});
