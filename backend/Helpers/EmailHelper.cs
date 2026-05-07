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

        public async Task SendPasswordEmail(string userEmail, string plainPassword)
        {
            // 1. Get secrets from Environment Variables (.env)
            var appPassword = Environment.GetEnvironmentVariable("GMAIL_APP_PASSWORD");

            if (string.IsNullOrEmpty(appPassword))
            {
                throw new Exception("CRITICAL: GMAIL_APP_PASSWORD is not set in environment variables.");
            }

            // 2. Get non-sensitive settings from appsettings.json
            var emailSettings = _config.GetSection("EmailSettings");

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["SenderEmail"]));
            message.To.Add(new MailboxAddress("User", userEmail));
            message.Subject = "Your AI MediConnect Credentials";
            message.Body = new TextPart("plain") 
            { 
                Text = $"Welcome to AI MediConnect!\n\nYour temporary password is: {plainPassword}\n\nPlease login and change your password for security." 
            };

            using var client = new SmtpClient();
            
            // Connect using settings from appsettings.json
            await client.ConnectAsync(
                emailSettings["SmtpServer"], 
                int.Parse(emailSettings["Port"] ?? "587"), 
                MailKit.Security.SecureSocketOptions.StartTls
            );

            // Authenticate using the secret App Password from .env
            await client.AuthenticateAsync(emailSettings["SenderEmail"], appPassword);
            
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
        public async Task SendOtpEmail(string userEmail, string otp)
        {
    var appPassword = Environment.GetEnvironmentVariable("GMAIL_APP_PASSWORD");
    if (string.IsNullOrEmpty(appPassword))
        throw new Exception("CRITICAL: GMAIL_APP_PASSWORD is not set.");

    var emailSettings = _config.GetSection("EmailSettings");

    var message = new MimeMessage();
    message.From.Add(new MailboxAddress(
        emailSettings["SenderName"], 
        emailSettings["SenderEmail"]
    ));
    message.To.Add(new MailboxAddress("User", userEmail));
    message.Subject = "AI MediConnect - Password Reset OTP";
    message.Body = new TextPart("plain")
    {
        Text = $"Your OTP for password reset is: {otp}\n\nThis OTP is valid for 10 minutes.\n\nIf you did not request this, please ignore."
    };

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