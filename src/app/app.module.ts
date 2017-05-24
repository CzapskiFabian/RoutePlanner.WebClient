import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    WorkspaceModule,
  ],
  exports:[
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
