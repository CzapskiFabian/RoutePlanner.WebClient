import { EngineersComponent } from './engineers/engineers.component';
import { JobsComponent } from './jobs/jobs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const workspaceRoutes: Routes = [
  { path: '', component: EngineersComponent},
  { path: 'engineers', component: EngineersComponent},
  { path: 'jobs', component: JobsComponent},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(workspaceRoutes)
  ],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}