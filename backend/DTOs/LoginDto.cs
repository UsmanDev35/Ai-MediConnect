namespace Backend.DTOs
{
    public class LoginDto
    {
        // The email address entered in the React login form
        public string Email { get; set; } = string.Empty;

        // The 8-character password sent to the user's email during registration
        public string Password { get; set; } = string.Empty;
    }
}