import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

////////components
import { HomeComponent } from './components/home/home.component';
import { ApplyToJobComponent } from './components/apply-to-job/apply-to-job.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { UniversityWinnipegComponent } from './components/university-winnipeg/university-winnipeg.component';
import { JobResumeUploadComponent } from './components/job-resume-upload/job-resume-upload.component';
import { ResumeCreatorComponent } from './components/resume-creator/resume-creator.component';
import { ViewUserResumeCreateDataComponent } from './components/view-user-resume-create-data/view-user-resume-create-data.component';
import { ViewUserResumeEmailDataComponent } from './components/view-user-resume-email-data/view-user-resume-email-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'apply-to-job', component: ApplyToJobComponent },
  { path: 'follow-up', component: FollowUpComponent },
  { path: 'uw-work', component: UniversityWinnipegComponent },
  { path: 'job-resume-upload', component: JobResumeUploadComponent },
  { path: 'resume-creator', component: ResumeCreatorComponent },
  { path: 'view-user-resume-create-data', component: ViewUserResumeCreateDataComponent },
  { path: 'view-user-resume-email-data', component: ViewUserResumeEmailDataComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
