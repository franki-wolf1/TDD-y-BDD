describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a list of todos', () => {
    // Given
    const todos = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];

    // When
    component.todos = todos;
    fixture.detectChanges();

    // Then
    const todoItems = fixture.nativeElement.querySelectorAll('.todo-item');
    expect(todoItems.length).toBe(todos.length);
    expect(todoItems[0].textContent).toContain('Task 1');
    expect(todoItems[1].textContent).toContain('Task 2');
  });

  // Más especificaciones para describir el comportamiento del componente...
});
