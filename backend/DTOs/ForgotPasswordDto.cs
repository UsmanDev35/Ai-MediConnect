namespace Backend.DTOs
{
    public class ForgotPasswordDto
    {
        public string Email { get; set; } = null!;
    }

    public class VerifyOtpDto
    {
        public string Email { get; set; } = null!;
        public string Otp { get; set; } = null!;
    }

    public class ResetPasswordDto
    {
        public string Email { get; set; } = null!;
        public string Otp { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
    }
}