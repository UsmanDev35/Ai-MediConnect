using MailKit.Net.Smtp;
using MimeKit;

namespace Backend.Helpers
{
    public class EmailHelper
    {
        private readonly IConfiguration _config;

        public EmailHelper(IConfiguration config)
        {
            _config = config;
        }

        // Method 1: For Registration
        public async Task SendPasswordEmail(string userEmail, string plainPassword)
        {
            var subject = "Your AI MediConnect Credentials";
            var body = $"Welcome to AI MediConnect!\n\nYour temporary password is: {plainPassword}\n\nPlease login and change your password for security.";
            
            await SendEmailAsync(userEmail, subject, body);
        }

        // Method 2: For Forgot Password
        public async Task SendOtpEmail(string userEmail, string otp)
        {
            var subject = "AI MediConnect - Password Reset OTP";
            var body = $"Your OTP for password reset is: {otp}\n\nThis OTP is valid for 10 minutes.\n\nIf you did not request this, please ignore.";
            
            await SendEmailAsync(userEmail, subject, body);
        }

        // Internal Private Method to handle the heavy lifting (DRY Principle)
        private async Task SendEmailAsync(string userEmail, string subject, string body)
        {
            var appPassword = Environment.GetEnvironmentVariable("GMAIL_APP_PASSWORD");
            if (string.IsNullOrEmpty(appPassword))
            {
                throw new Exception("CRITICAL: GMAIL_APP_PASSWORD is not set in environment variables.");
            }

            var emailSettings = _config.GetSection("EmailSettings");

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["SenderEmail"]));
            message.To.Add(new MailboxAddress("User", userEmail));
            message.Subject = subject;
            message.Body = new TextPart("plain") { Text = body };

            using var client = new SmtpClient();
            
            await client.ConnectAsync(
                emailSettings["SmtpServer"], 
                int.Parse(emailSettings["Port"] ?? "587"), 
                MailKit.Security.SecureSocketOptions.StartTls
            );

            await client.AuthenticateAsync(emailSettings["SenderEmail"], appPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}