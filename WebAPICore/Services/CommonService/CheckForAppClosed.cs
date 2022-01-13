using EFCore.Context;
using EFCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.CommonService
{
    public class CheckForAppClosed
    {
        private readonly JobAppsDBContext appDbContext;

        public CheckForAppClosed(JobAppsDBContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public bool JobAppClosed(int jobApplicationId)
        {
            var lastAppStatusLog = appDbContext.AppStatusLog
                                      .Where(x => x.JobApplicationId == jobApplicationId);
            if (lastAppStatusLog != null && lastAppStatusLog.Count() > 0)
            {
                var lastAppStatusLog_ = lastAppStatusLog.ToList().LastOrDefault();
                if (lastAppStatusLog_.AppStatus == AppStatusType.Closed)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
