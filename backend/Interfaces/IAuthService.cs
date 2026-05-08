using Backend.DTOs;

namespace Backend.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterUserAsync(RegisterDto model);
        Task<object> LoginUserAsync(LoginDto model);
        Task SendOtpAsync(string email);
        Task ResetPasswordAsync(ResetPasswordDto model);
        Task VerifyOtpAsync(VerifyOtpDto model);
    }
}