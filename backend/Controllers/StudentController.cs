using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        // GET all students
        [HttpGet]
        public IActionResult GetStudents()
        {
            var students = _context.Students.ToList();
            return Ok(students);
        }

        // POST student
        [HttpPost]
        public IActionResult AddStudent(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();

            return Ok(student);
        }

        // PUT student
        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id, Student updatedStudent)
        {
            var student = _context.Students.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            student.Name = updatedStudent.Name;
            student.Email = updatedStudent.Email;
            student.Course = updatedStudent.Course;

            _context.SaveChanges();

            return Ok(student);
        }

        // DELETE student
        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = _context.Students.Find(id);

            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            _context.SaveChanges();

            return Ok();
        }
    }
}