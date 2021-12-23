using ResumeService.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ResumeService
{
    public interface IResumeCreator
    {
        string GetPageHeader();
        Header GetHeader();
        string GetHeaderString(Header header);
        string GetPageFooter();

    }
}
