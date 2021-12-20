using System;
using System.Collections.Generic;
using System.Text;

namespace EFCore.Models
{
    public class JobApplication
    {
        public int JobApplicationId { get; set; }
        public string CompanyName { get; set; }
        public string AgencyName { get; set; }
        public string WebURL { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactEmail { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public DateTime AppliedOn { get; set; }
        public AppStatusType AppStatus { get; set; }
        public string FollowUpNotes { get; set; }

        public JobResume JobResume { get; set; }
    }
}
