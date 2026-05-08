namespace Backend.DTOs
{
   public class RegisterDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty; // Sent as a string like "Doctor"
    public int Age { get; set; } // New property
}
}