import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../paciente.service';
import { Paciente } from '../paciente';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  paciente: Paciente[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public pacienteService: PacienteService) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.pacienteService.getAll().subscribe((data: Paciente[]) => {
      this.paciente = data;
      console.log(this.paciente);
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(_id: string) {
    this.pacienteService.delete(_id).subscribe((res: any) => {
      this.paciente = this.paciente.filter((item) => item._id !== _id);
      console.log('Post deleted successfully!');
    });
  }
 
}
