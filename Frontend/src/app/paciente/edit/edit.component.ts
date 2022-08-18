import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../paciente';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: string;
  paciente!: Paciente;
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['pacienteId'];
    this.pacienteService.find(this.id).subscribe((data: Paciente) => {
      this.paciente = data;
    });

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
    this.pacienteService
      .update(this.id, this.form.value)
      .subscribe((res: any) => {
        console.log('Post updated successfully!');
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
      this.form.value.riesgo = 'Calculo erroneo: valores inadecuados';
    }
  }
}
