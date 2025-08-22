using ClassLibrary.Model;
using Microsoft.EntityFrameworkCore;

namespace EmployeeTaskManagement.EmployeeDB
{
    public class EmployeeDbContext:DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {
        }

        
        public DbSet<Employee> Employees { get; set; }  
      public DbSet<TaskManagement> TaskManagements { get; set; }
    }
}
