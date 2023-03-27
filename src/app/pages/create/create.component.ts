import { ICar } from '../../core/services/models/cars-models';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { trigger, transition, style, animate } from '@angular/animations';
import { CarsService } from 'src/app/core/services/cars/cars.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CreateComponent {

 // Incialización del formulario
 public registerCar: FormGroup;
 // variable submitted a false
 public submitted: boolean = false;
  

 // Inicializamos FormBuilder en el constructor
 constructor(
  private formBuilder: FormBuilder,
  private carsservice : CarsService ,
  ) {
    // Nuestro formulario - sin campos por defecto
    // Podemos meter valores por defecto en las comillas
     this.registerCar = this.formBuilder.group({
       marca: ['', [Validators.required, Validators.maxLength(20)]],
       modelo: ['', [Validators.required, Validators.maxLength(20)]],
       imagen: ['', [Validators.required, Validators.maxLength(20)]],
     });
  }
 
 //Función accionada al clickar en submit
 public onSubmit(): void {
     // El usuario ha pulsado en submit->cambia a true submitted
     this.submitted = true;
     // Si el formulario es valido
     if (this.registerCar.valid) {
       // Creamos un Usuario y lo emitimos
       const car: ICar = {
         
         marca: this.registerCar.get('marca')?.value,
         modelo: this.registerCar.get('modelo')?.value,
         imagen: this.registerCar.get('imagen')?.value,
       };
       console.log(car);
       this.carsservice.addCars(car).subscribe(
        (response) => {
          console.log('Datos enviados con éxito');
        },
        (error) => {
          console.error('Error al enviar los datos', error);
        }
      );
    }
    }
       // Reseteamos todos los campos y el indicador de envío o submitted
      //  this.registerCar.reset();
      //  this.submitted = false;
     }
   


