using Services.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IUWRepository
    {
        IEnumerable<LeftJoin_Uut_Uuga> GetUutGrpByDebitCredit_GL_Number();
    }
}
