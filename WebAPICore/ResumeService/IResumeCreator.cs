using ResumeService.Models;
using SelectPdf;
using System;
using System.Collections.Generic;
using System.Text;

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

    }
}
