import { EngineersComponent } from './engineers/engineers.component';
import { JobsComponent } from './jobs/jobs.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    WorkspaceComponent,
    EngineersComponent,
    JobsComponent,
    ScheduleComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkspaceRoutingModule
  ],
  exports: [
    WorkspaceComponent
  ],
  providers: [

  ]
})
export class WorkspaceModule { }
