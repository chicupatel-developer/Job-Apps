﻿using EFCore.Context;
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
            using var transaction = appDbContext.Database.BeginTransaction();
            try
            {
                // 1)
                var result = appDbContext.JobApplications.Add(jobApplication);
                appDbContext.SaveChanges();

                // throw new Exception();

                // 2)
                AppStatusLog appStatusLog = new AppStatusLog()
                {
                    AppStatusChangedOn = DateTime.Now,
                    JobApplicationId = result.Entity.JobApplicationId,
                    AppStatus = 0
                };
                appDbContext.AppStatusLog.Add(appStatusLog);
                appDbContext.SaveChanges();

                // commit 1 & 2
                transaction.Commit();
                return result.Entity;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                throw new Exception();
            }          
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

            using var transaction = appDbContext.Database.BeginTransaction();
            try
            {
                var jobApp_ = appDbContext.JobApplications
                          .Where(x => x.JobApplicationId == jobApplication.JobApplicationId).FirstOrDefault();
                if (jobApp_ != null)
                {
                    // 1) edit JobApplications db table
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


                    // throw new Exception();

                    // 2) add into AppStatusLog db table
                    AppStatusLog appStatusLog = new AppStatusLog()
                    {
                        AppStatusChangedOn = DateTime.Now,
                        JobApplicationId = jobApp_.JobApplicationId,
                        AppStatus = jobApplication.AppStatus
                    };
                    appDbContext.AppStatusLog.Add(appStatusLog);
                    appDbContext.SaveChanges();

                    // throw new Exception();

                    // commit 1 & 2
                    transaction.Commit();

                    return jobApplication;
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new Exception();
            }     
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

        public IEnumerable<AppStatusLog> TractJobAppStatus(int jobAppId)
        {
            List<AppStatusLog> appStatusLog = new List<AppStatusLog>();

            var appStatusLog_ = appDbContext.AppStatusLog
                            .Where(x => x.JobApplicationId == jobAppId);
            if(appStatusLog_!=null && appStatusLog_.Count() > 0)
            {
                appStatusLog = appStatusLog_.ToList();
            }
            return appStatusLog;
        }
    }
}
