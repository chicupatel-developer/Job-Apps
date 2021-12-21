using EFCore.Context;
using System;
using System.Collections.Generic;
using System.Text;
using Services.Interfaces;
using EFCore.Models;
using System.Data.SqlClient;
using System.Data.Entity.Core;

namespace Services.Repositories
{
    public class JobResumeRepository : IJobResumeRepository
    {
        private readonly JobAppsDBContext appDbContext;

        public JobResumeRepository(JobAppsDBContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public bool StoreResumeFile(JobResume jobResume)
        {
            try
            {
                var result = appDbContext.JobResumes.Add(jobResume);
                appDbContext.SaveChanges();
                return true;
            }        
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
