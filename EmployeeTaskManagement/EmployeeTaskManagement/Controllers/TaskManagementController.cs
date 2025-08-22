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
    public class TaskManagementController : ControllerBase
    {

        private readonly EmployeeDbContext   dbContext;

        public TaskManagementController(EmployeeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]

        public IActionResult GetAllTasks()
        {
            var tasks = dbContext.TaskManagements.ToList();
            return Ok(tasks);
        }

        [HttpGet]
        [Route("{TaskId:int}")]

        public IActionResult GetTaskById(int TaskId)
        {
            var task = dbContext.TaskManagements.FirstOrDefault(t => t.TaskId == TaskId);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]

        public IActionResult createTask([FromBody] TaskManagementDto taskManagementDto)
        {
            var taskmanagement = new TaskManagement()
            {
                Title = taskManagementDto.Title,
                Description = taskManagementDto.Description,
                DueDate = taskManagementDto.DueDate,
                Status = taskManagementDto.Status,
                EmployeeId = taskManagementDto.EmployeeId

            };
            dbContext.TaskManagements.Add(taskmanagement);
            dbContext.SaveChanges();
            return Ok(taskmanagement);
        }



        [HttpPut]

        [Route("{TaskId:int}")]

        public IActionResult UpdateTask(int TaskId, [FromBody] TaskManagementDto taskManagementDto)
        {
            var task = dbContext.TaskManagements.FirstOrDefault(t => t.TaskId == TaskId);
            if (task == null)
            {
                return NotFound();
            }

            task.Title = taskManagementDto.Title;
            task.Description = taskManagementDto.Description;
            task.DueDate = taskManagementDto.DueDate;
            task.Status = taskManagementDto.Status;
            task.EmployeeId = taskManagementDto.EmployeeId;

            dbContext.SaveChanges();
            return Ok(task);
        }

        [HttpDelete]

        [Route("{TaskId:int}")]
        public IActionResult DeleteTask(int TaskId)
        {
            var task = dbContext.TaskManagements.FirstOrDefault(t => t.TaskId == TaskId);
            if (task == null)
            {
                return NotFound();
            }

            dbContext.TaskManagements.Remove(task);
            dbContext.SaveChanges();
            return Ok();
        }

        [HttpGet("Summary")]

        public IActionResult Getsummary()
        {
            var taskSummary = dbContext.TaskManagements
                .GroupBy(t => t.Status)
                .Select(g => new
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .ToList();

            return Ok(taskSummary);
        }



    }
}
