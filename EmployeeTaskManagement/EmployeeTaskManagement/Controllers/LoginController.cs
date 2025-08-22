using ClassLibrary.DTO;
using EmployeeTaskManagement.EmployeeDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeTaskManagement.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly EmployeeDbContext dbContext;
        private readonly IConfiguration configuration;

        public LoginController(EmployeeDbContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
        }
        
        [HttpPost]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            // 🔹 Validate employee from DB
            var result = dbContext.Employees
                .FirstOrDefault(p => p.Name == loginDto.Name && p.Email == loginDto.Email);

            if (result == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // 🔹 Create JWT claims
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, result.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("EmployeeId", result.EmployeeId.ToString())
            };

            // ✅ Use JwtSettings instead of Jwt
            var secret = configuration["JwtSettings:Key"];
            if (string.IsNullOrEmpty(secret))
            {
                throw new Exception("JWT Secret Key is missing in configuration (JwtSettings:Key).");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["JwtSettings:Issuer"],
                audience: configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(configuration["JwtSettings:TokenValidityMins"])
                ),
                signingCredentials: creds
            );

            string tokenKey = new JwtSecurityTokenHandler().WriteToken(token);

            var tokenDto = new TokenDto
            {
                Token = tokenKey,
                EmployeeId = result.EmployeeId,
                Name = result.Name
            };

            return Ok(tokenDto);
        }
    }
}
