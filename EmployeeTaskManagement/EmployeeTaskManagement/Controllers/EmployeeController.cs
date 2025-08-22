using ClassLibrary.DTO;
using ClassLibrary.Model;
using EmployeeTaskManagement.EmployeeDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeTaskManagement.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext dbContext;

        public EmployeeController(EmployeeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var employees = dbContext.Employees.ToList();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = dbContext.Employees.FirstOrDefault(e => e.EmployeeId == id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]

        public IActionResult CreateEmployee([FromBody] EmployeeDto employeeDto)
        {
            var employee = new Employee()
            {
                Name = employeeDto.Name,
                Email = employeeDto.Email,
                Department = employeeDto.Department,
                JoiningDate = employeeDto.JoiningDate



            };

                      dbContext.Employees.Add(employee);
                        dbContext.SaveChanges();
            
            
            return Ok (employee);
        }


        [HttpPut]

        [Route("{EmployeeId:int}")]

        public IActionResult UpdateEmployee(int EmployeeId, [FromBody] EmployeeDto employeeDto)
        {
            var employee = dbContext.Employees.FirstOrDefault(e => e.EmployeeId == EmployeeId);
            if (employee == null)
            {
                return NotFound();
            }

            employee.Name = employeeDto.Name;
            employee.Email = employeeDto.Email;
            employee.Department = employeeDto.Department;
            employee.JoiningDate = employeeDto.JoiningDate;

            dbContext.SaveChanges();

            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = dbContext.Employees.FirstOrDefault(e => e.EmployeeId == id);
            if (employee == null)
            {
                return NotFound();
            }

            dbContext.Employees.Remove(employee);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
