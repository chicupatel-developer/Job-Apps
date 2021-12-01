using EFCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IJobApplicationRepository
    {
        JobApplication AddJobApp(JobApplication jobApplication);
        IEnumerable<JobApplication> GetAllJobApps();
        List<string> GetAppStatusTypes();
    }
}
