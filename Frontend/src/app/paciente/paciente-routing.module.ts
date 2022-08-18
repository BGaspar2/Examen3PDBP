import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'paciente', redirectTo: 'paciente/index', pathMatch: 'full' },
  { path: 'paciente/index', component: IndexComponent },
  { path: 'paciente/:pacienteId/view', component: ViewComponent },
  { path: 'paciente/create', component: CreateComponent },
  { path: 'paciente/:pacienteId/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteRoutingModule {}
