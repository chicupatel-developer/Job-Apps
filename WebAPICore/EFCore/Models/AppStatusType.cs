using System;
using System.Collections.Generic;
using System.Text;

namespace EFCore.Models
{
    public enum AppStatusType
    {
        Applied,
        FollowUp,
        ClientResponse,
        InterviewSetup,
        InterviewDone,
        ClientFinalResponse
    }
}
