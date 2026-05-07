using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public enum UserRole { Admin, Doctor, Patient, AmbulanceDriver }

    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? OtpCode { get; set; }
        public DateTime? OtpExpiry { get; set; }
        // This stores the role as a string in MongoDB for easy reading
        [BsonRepresentation(BsonType.String)]
        public UserRole Role { get; set; } 
    }
}