import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {

  public counter = signal(10);

  // propiedad solo lectura, no se pueden modificar, solo cambia su valor cuando cualquier de las señales que esten dentro del método computado

  public squareCounter = computed( () => this.counter() * this.counter() );

  increaseBy( value: number ) {

    // this.counter.set( this.counter() + value );

    this.counter.update( current => current + value ) // utilizamos current para hacer referencia al valor actual
  }
}
