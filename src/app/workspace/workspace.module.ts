import { WorkspaceRoutingModule } from './workspace-routing.module';
import { JobsService } from '../../domain/services/jobs.service';
import { EngineerService } from './../../domain/services/engineers.service';
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
    JobsService,
    EngineerService
  ]
})
export class WorkspaceModule {}
