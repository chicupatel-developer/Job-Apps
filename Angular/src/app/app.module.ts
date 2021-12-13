import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

////////components
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyToJobComponent } from './components/apply-to-job/apply-to-job.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { UniversityWinnipegComponent } from './components/university-winnipeg/university-winnipeg.component';

////////services
import { LocalDataService } from './services/local-data.service';

// angular-material
import { MaterialModule } from './material.module';
import { JobAppEditDialogComponent } from './components/job-app-edit-dialog/job-app-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ApplyToJobComponent,
    FollowUpComponent,
    JobAppEditDialogComponent,
    UniversityWinnipegComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [HttpClientModule, LocalDataService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
