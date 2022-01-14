using EFCore.Models;
using ResumeService.Models;
using SelectPdf;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ResumeService
{
    public interface IResumeCreator
    {
        HtmlToPdf GetHtmlToPdfObject();
        string GetPageHeader();
        string GetPersonalInfoString(PersonalInfo personalInfo);
        string GetTechnicalSkillsString(List<string> skills);
        string GetPageFooter();
        string GetWorkExperienceString(List<WorkExperience> workExperience);
        string GetEducationString(List<Education> educations);
        bool AddUserData(UserResumeCreate userData);
        IEnumerable<UserResumeCreate> GetUserResumeCreateData();
    }
}
