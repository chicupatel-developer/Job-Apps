using ResumeService.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ResumeService
{
    public interface IResumeCreator
    {
        string GetPageHeader();
        string GetHeaderString(Header header);
        string GetCoreSkillsString(List<string> skills);
        string GetPageFooter();

    }
}
