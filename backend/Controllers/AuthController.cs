using Backend.Data;
using Backend.Models;
using Backend.DTOs;
using Backend.Helpers;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class AuthController : ControllerBase
    {
        private readonly MongoDbContext _context;
        private readonly EmailHelper _emailHelper;
        private readonly IConfiguration _configuration;

        public AuthController(MongoDbContext context, EmailHelper emailHelper, IConfiguration configuration)
        {
            _context = context;
            _emailHelper = emailHelper;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var existingUser = await _context.Users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (existingUser != null) return BadRequest("Email already registered.");

            string plainPassword = Guid.NewGuid().ToString().Substring(0, 8);

            var newUser = new User
            {
                FullName = model.FullName,
                Email = model.Email,
                PasswordHash = plainPassword, 
                Role = UserRole.Patient 
            };

            await _context.Users.InsertOneAsync(newUser);

            try {
                await _emailHelper.SendPasswordEmail(model.Email, plainPassword);
            } catch {
                return Ok(new { message = "User saved, but email failed. Check SMTP settings." });
            }

            return Ok(new { message = "Registration successful! Check your email." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            // 1. Find user in MongoDB
            var user = await _context.Users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();

            // 2. Validate Password (Comparing plain text for now as requested)
            if (user == null || user.PasswordHash != model.Password)
            {
                return Unauthorized("Invalid email or password.");
            }

            // 3. Generate JWT Token
            var token = GenerateJwtToken(user);

            // 4. Return user info and token to React
            return Ok(new 
            { 
                token = token,
                user = new { 
                    user.FullName, 
                    user.Email, 
                    role = user.Role.ToString() 
                } 
            });
        }
 [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] ForgotPasswordDto model)
        {
            var user = await _context.Users
                .Find(u => u.Email == model.Email)
                .FirstOrDefaultAsync();

            if (user == null)
                return BadRequest("Email not found.");

            // OTP 
            var otp = new Random().Next(100000, 999999).ToString();
            var expiry = DateTime.UtcNow.AddMinutes(10);

            var update = Builders<Backend.Models.User>.Update
                .Set(u => u.OtpCode, otp)
                .Set(u => u.OtpExpiry, expiry);

            await _context.Users.UpdateOneAsync(
                u => u.Email == model.Email, update
            );
            //test commit 

         
            await _emailHelper.SendOtpEmail(model.Email, otp);

            return Ok(new { message = "OTP sent to your email." });
        }

        
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto model)
        {
            var user = await _context.Users
                .Find(u => u.Email == model.Email)
                .FirstOrDefaultAsync();

            if (user == null)
                return BadRequest("Email not found.");

            if (user.OtpCode != model.Otp)
                return BadRequest("Invalid OTP.");

            if (user.OtpExpiry < DateTime.UtcNow)
                return BadRequest("OTP has expired. Please request a new one.");

            return Ok(new { message = "OTP verified successfully." });
        }

        // Step 3: New password 
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            var user = await _context.Users
                .Find(u => u.Email == model.Email)
                .FirstOrDefaultAsync();

            if (user == null)
                return BadRequest("Email not found.");

            if (user.OtpCode != model.Otp)
                return BadRequest("Invalid OTP.");

            if (user.OtpExpiry < DateTime.UtcNow)
                return BadRequest("OTP has expired.");

            
            var update = Builders<Backend.Models.User>.Update
                .Set(u => u.PasswordHash, model.NewPassword)
                .Unset(u => u.OtpCode)
                .Unset(u => u.OtpExpiry);

            await _context.Users.UpdateOneAsync(
                u => u.Email == model.Email, update
            );

            return Ok(new { message = "Password reset successful! You can now login." });
        }
        
        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"] ?? "Your_Default_Very_Long_Secret_Key_123!");

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id ?? ""),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        
    }
}