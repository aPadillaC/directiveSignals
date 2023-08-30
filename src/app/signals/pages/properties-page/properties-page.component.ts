import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit{

  // Cogemos un usuario como referencia

  public user = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });


  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }`);



  // -------------- Señales ----------------------

  public counter = signal(10);

  public userChangedEffect = effect( () => {

    console.log(` ${this.user().first_name} - ${ this.counter()}`);

  })


  // Metodo para demostrar que el effect() se limpia automáticamente sin necesidad de implementar el OnDestroy()
  ngOnInit(): void {

    setInterval( () => {

      this.counter.update( current => current + 1)

      // Para poner un limite al setInterval
      // if( this.counter() == 15) {

      //   this.userChangedEffect.destroy();
      // }
    }, 1000);
  }


  ngOnDestroy(): void {

    this.userChangedEffect.destroy();
  }


  increaseBy( value: number) {

    this.counter.update( current => current + value);
  }


  // ---------------------------------------------------

  // Metodo para modificar campos

  onFieldUpdated( field: keyof User, value: string ) {


    // A) Utilizando el update

    this.user.update( current => {

      return {
        ...current,
        [field]: value
      }
    })




    // b) Utilizando el mutate, metodo mas seguro ya que la propiedad 'id' es de tipo number y de esta manera podemos controlarla

    // this.user.mutate( current => {

    //   switch( field ) {

    //     case 'email':
    //       current.email = value;
    //       break;

    //     case 'first_name':
    //       current.first_name = value;
    //       break;

    //     case 'last_name':
    //       current.last_name = value;
    //       break;

    //     case 'id':
    //       current.id = Number(value);
    //       break;
    //   }
    // })




    // c) Utilizando el set

    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // })
  }

}
