using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Model
{
    public class Employee
    {

        public int EmployeeId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Department { get; set; }

        public  DateTime JoiningDate { get; set; }

        public ICollection<TaskManagement> ?Tasks { get; set; }


    }
}
