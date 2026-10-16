import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertComponent] }).compileComponents();
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería tener texto vacío por defecto', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component.text).toBe('');
  });

  it('clase primary en loading y danger en error', () => {
    component.alertState = 'loading';
    expect(component.getClass()).toContain('alert-primary');
    component.alertState = 'error';
    expect(component.getClass()).toContain('alert-danger');
  });

  it('debería mapear alertClassMap', () => {
    expect(component.alertClassMap['loading']).toBe('primary');
    expect(component.alertClassMap['error']).toBe('danger');
  });

  it('debería renderizar el texto recibido', () => {
    component.alertState = 'loading';
    component.text = 'Cargando Authors...';
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Cargando Authors...');
  });

  it('no debería lanzar errores con estado válido', () => {
    component.alertState = 'error';
    expect(() => component.getClass()).not.toThrow();
  });
});
