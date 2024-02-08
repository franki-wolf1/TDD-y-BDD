describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a username input field', () => {
    const usernameInput = fixture.nativeElement.querySelector('input[name="username"]');
    expect(usernameInput).toBeTruthy();
  });

  it('should have a password input field', () => {
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    expect(passwordInput).toBeTruthy();
  });

  // Más pruebas para validar el comportamiento del componente...
});
