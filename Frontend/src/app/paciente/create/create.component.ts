import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../paciente.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public pacienteService: PacienteService,
    private router: Router
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      nombreCompleto: new FormControl('', [Validators.required]),
      porcentajeAzucar: new FormControl('', Validators.required),
      porcentajeGrasa: new FormControl('', Validators.required),
      porcentajeOxigeno: new FormControl('', Validators.required),
      riesgo: new FormControl({ value: '', disabled: true }),
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    console.log(this.form.value);
    this.pacienteService.create(this.form.value).subscribe((res) => {
      console.log('Paciente created successfully!');
      this.router.navigateByUrl('paciente/index');
    });
  }

  calcularRiesgo() {
    const azucar = this.form.value.porcentajeAzucar;
    const grasa = this.form.value.porcentajeGrasa;
    const oxigeno = this.form.value.porcentajeOxigeno;

    if (azucar > 70.0 && grasa > 88.5 && oxigeno < 60.0) {
      this.form.value.riesgo = 'ALTO';
    } else if (
      azucar >= 50.0 &&
      azucar <= 70.0 &&
      grasa >= 62.2 &&
      grasa <= 88.5 &&
      oxigeno >= 60.0 &&
      oxigeno <= 70.0
    ) {
      this.form.value.riesgo = 'MEDIO';
    } else if (azucar < 50.0 && grasa < 62.2 && oxigeno > 70.0) {
      this.form.value.riesgo = 'BAJO';
    } else {
      this.form.value.riesgo = 'Calculo erroneo: Valores inadecuados';
    }
  }
}
