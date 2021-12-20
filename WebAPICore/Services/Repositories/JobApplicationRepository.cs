using EFCore.Context;
using EFCore.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly JobAppsDBContext appDbContext;

        public JobApplicationRepository(JobAppsDBContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public JobApplication AddJobApp(JobApplication jobApplication)
        {
            var result = appDbContext.JobApplications.Add(jobApplication);
            appDbContext.SaveChanges();
            return result.Entity;
        }

        public IEnumerable<JobApplication> GetAllJobApps()
        {
            var jobApps = appDbContext.JobApplications;
            if (jobApps != null)
                return jobApps;
            else
                return new List<JobApplication>();
        }

        public List<string> GetAppStatusTypes()
        {
            List<string> appStatusTypes = new List<string>();
            foreach (string appStatusType in Enum.GetNames(typeof(AppStatusType)))
            {
                appStatusTypes.Add(appStatusType);
            }
            return appStatusTypes;
        }

        public JobApplication EditJobApp(JobApplication jobApplication)
        {
            // check for catch exception @ angular
            // throw new Exception();

            var jobApp_ = appDbContext.JobApplications
                            .Where(x => x.JobApplicationId == jobApplication.JobApplicationId).FirstOrDefault();
            if (jobApp_ != null)
            {
                jobApp_.PhoneNumber = jobApplication.PhoneNumber;
                jobApp_.Province = jobApplication.Province;
                jobApp_.WebURL = jobApplication.WebURL;
                jobApp_.FollowUpNotes = jobApplication.FollowUpNotes;
                jobApp_.ContactPersonName = jobApplication.ContactPersonName;
                jobApp_.ContactEmail = jobApplication.ContactEmail;
                jobApp_.CompanyName = jobApplication.CompanyName;
                jobApp_.City = jobApplication.City;
                jobApp_.AppStatus = jobApplication.AppStatus;
                jobApp_.AppliedOn = jobApplication.AppliedOn;
                jobApp_.AgencyName = jobApplication.AgencyName;
                appDbContext.SaveChanges();
            }       
            return jobApplication;
        }

        public JobApplication ViewJobApp(int jobAppId)
        {
            // check for exception
            // throw new Exception();

            JobApplication jobApplication = new JobApplication();

            jobApplication = appDbContext.JobApplications
                                .Where(x => x.JobApplicationId == jobAppId).FirstOrDefault();

            return jobApplication;
        }

        public bool DeleteJobApp(JobApplication jobApplication)
        {
            try
            {
                // check for exception
                // throw new Exception();

                appDbContext.JobApplications.RemoveRange(appDbContext.JobApplications.Where(x => x.JobApplicationId == jobApplication.JobApplicationId).ToList());
                appDbContext.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }         
        }
   
        public bool StoreResumeFile(JobResume jobResume)
        {
            try
            {
                var result = appDbContext.JobResumes.Add(jobResume);
                appDbContext.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }            
        }
    }
}
