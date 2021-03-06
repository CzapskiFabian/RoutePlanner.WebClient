import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EngineersComponent } from './engineers/engineers.component';
import { JobsComponent } from './jobs/jobs.component';
@NgModule({
  declarations: [
    WorkspaceComponent,
    EngineersComponent,
    JobsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkspaceRoutingModule
  ],
  exports:[
      WorkspaceComponent
  ],
  providers:[

  ]
})
export class WorkspaceModule {}
