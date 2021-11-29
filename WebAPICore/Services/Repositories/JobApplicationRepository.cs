using EFCore.Context;
using EFCore.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
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
    }
}
