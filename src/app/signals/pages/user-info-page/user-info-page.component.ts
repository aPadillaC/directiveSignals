import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit{

  // Inyección de de dependencias sin utilizar el constructor

  private userService = inject(UsersServiceService);

  public userId = signal(1);


  // la señal puede ser de tipo User o undefined en algun momento

  public currentUser = signal<User | undefined>(undefined);


  public userWasFound = signal(false);


  // Propiedad de solo lectura para concatenar el nombre en una sola variable

  public fullName = computed<string>( () => {

    if( !this.currentUser() ) return 'Usuario no encontrado'

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  })




  // Implementamos el metodo OnInit para que haga la petición automática del primer usuario

  ngOnInit(): void {

    this.loadUser(this.userId());
  }



  // Método para la actualización de las diferentes señales

  loadUser( id: number ) {

    if( id <= 0 ) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.userService.getUserById(id)

    // utilizamos next y error para poder manejar los errores cuando no encontramos un usuario

      .subscribe( {

        next: (user) => {
          this.currentUser.set( user );
          this.userWasFound.set(true);
        },
        error: () => {

          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        }
      })
  }

}
