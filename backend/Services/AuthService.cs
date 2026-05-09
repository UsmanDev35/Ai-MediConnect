using Backend.Models;
using Backend.DTOs;
using Backend.Data;
using Backend.Interfaces;
using Backend.Helpers;
using MongoDB.Driver;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Services
{
    
    public class AuthService : IAuthService
    {
        private readonly MongoDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly EmailHelper _emailHelper;

        public AuthService(MongoDbContext context, IConfiguration configuration, EmailHelper emailHelper)
        {
            _context = context;
            _configuration = configuration;
            _emailHelper = emailHelper;
        }

        public async Task<string> RegisterUserAsync(RegisterDto model)
        {
            var existingUser = await _context.Users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (existingUser != null) throw new Exception("Email already registered.");

            string plainPassword = Guid.NewGuid().ToString().Substring(0, 8);

            var newUser = new User {
                FullName = model.FullName,
                Email = model.Email,
                Age = model.Age,
                PasswordHash = plainPassword,
                Role = Enum.Parse<UserRole>(model.Role)
            };

            await _context.Users.InsertOneAsync(newUser);
            await _emailHelper.SendPasswordEmail(newUser.Email, plainPassword);
            return plainPassword;
        }

        public async Task<object> LoginUserAsync(LoginDto model)
        {
            var user = await _context.Users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (user == null || user.PasswordHash != model.Password)
                throw new Exception("Invalid email or password.");

            var token = GenerateJwtToken(user);
            return new { token, user = new { user.FullName, user.Email, role = user.Role.ToString() } };
        }

        public async Task SendOtpAsync(string email)
        {
            var user = await _context.Users.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null) throw new Exception("User not found.");

            var otp = new Random().Next(100000, 999999).ToString();
            var update = Builders<User>.Update
                .Set(u => u.OtpCode, otp)
                .Set(u => u.OtpExpiry, DateTime.UtcNow.AddMinutes(10));

            await _context.Users.UpdateOneAsync(u => u.Email == email, update);
            await _emailHelper.SendOtpEmail(email, otp); // Make sure this method exists in EmailHelper!
        }

        public async Task ResetPasswordAsync(ResetPasswordDto model)
        {
            var user = await _context.Users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
            if (user == null || user.OtpCode != model.Otp || user.OtpExpiry < DateTime.UtcNow)
                throw new Exception("Invalid or expired OTP.");

            var update = Builders<User>.Update
                .Set(u => u.PasswordHash, model.NewPassword)
                .Unset(u => u.OtpCode)
                .Unset(u => u.OtpExpiry);

            await _context.Users.UpdateOneAsync(u => u.Email == model.Email, update);
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"] ?? "SecretKeyGoesHereMustBeLong");
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Id ?? ""),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"]
            };
            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        }


        public async Task VerifyOtpAsync(VerifyOtpDto model)
{
    var user = await _context.Users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();

    if (user == null) 
        throw new Exception("User not found.");
    
    if (user.OtpCode != model.Otp) 
        throw new Exception("Invalid OTP.");
    
    if (user.OtpExpiry < DateTime.UtcNow) 
        throw new Exception("OTP has expired. Please request a new one.");
    
    // If it reaches here, the OTP is correct!
}
    }
}