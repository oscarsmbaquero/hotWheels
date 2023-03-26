import { ICar } from './../../core/services/models/cars-module';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @Input() public car?:ICar;

    public formCar?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.formCar = this.formBuilder.group({
      name : new FormControl(this.car ? this.car.marca : '',[Validators.required]),
      image: new FormControl(this.car ? this.car.image : '',[Validators.required]),
      year: new FormControl(this.car ? this.car.modelo : '',[Validators.required]),
    });
  }
    public saveCar(){

      console.log('Entro');
      // const formValue = this.albumForm?.value;//vslor del formulario
      // console.log(formValue);
      // const  albumAdd$ = this.editMode && this.album
      // ? this.albumsService.editAlbum(this.album.id, formValue)
      // : this.albumsService.addAlbum(formValue);
      // albumAdd$.subscribe((album) => {
      // this.router.navigate(['list']);
      // });
  }

}
