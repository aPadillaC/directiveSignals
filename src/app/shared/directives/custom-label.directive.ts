import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;


  // Recibo el valor del color del padre y lo seteo en la variable
  @Input()
  set color ( value: string) {

    this._color = value;
    this.setStyle();
  }


  // Recibo el valor de los erroes del padre y lo seteo en la variable
  @Input()
  set errors ( value: ValidationErrors | null | undefined ) {

    this._errors = value;
    this.setErrorMessage();

  }

  constructor( private el: ElementRef<HTMLElement>) {

    this.htmlElement = el;
  }


  ngOnInit(): void {

    // Para el color inicial de la etiqueta
    this.setStyle();
  }



  // Método para cambiar el color al texto segun el valor recibido del padre
  setStyle(): void {

    if ( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }




  // Método para cambiar eltexto segun los errores recibidos del padre
  setErrorMessage(): void {

    if ( !this.htmlElement ) return;

    if ( !this._errors || this._errors == null) {

      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys( this._errors );

    if( errors.includes('required')) {

      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if( errors.includes('minlength')) {

      const min = this._errors['minlength']['requiredLength'];
      const current = this._errors['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Hay ${current} caracteres y de tener como min ${min}`;
      return;
    }

    if( errors.includes('email')) {

      this.htmlElement.nativeElement.innerText = `Email no válido`;
      return;
    }
  }
}
