// namespace Backend.DTOs
// {
// //    public class RegisterDto
// // {
// //     public string FullName { get; set; } = string.Empty;
// //     public string Email { get; set; } = string.Empty;
// //     public string Password { get; set; } = string.Empty;
// //     public string Role { get; set; } = string.Empty; // Sent as a string like "Doctor"
// //     public int Age { get; set; } // New property
// // }

// public class RegisterDto
// {
//     public string FullName { get; set; } = null!;
//     public string Email { get; set; } = null!;
//     public int Age { get; set; }
//     public string Role { get; set; } = null!;
//     public string City { get; set; } = null!;
//     public string Password { get; set; } = null!;

//     // Optional fields for specific roles
//     public string? PmdcNumber { get; set; }
//     public string? Specialization { get; set; }
//     public int? Experience { get; set; }
//     public string? VehicleNumber { get; set; }
//     public bool? HasOxygen { get; set; }
//     public bool? HasStretcher { get; set; }
// }

// }


namespace Backend.DTOs
{
    public class RegisterDto
    {
        // ─── Common Fields ────────────────────────────────────────────────
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int Age { get; set; }
        public string Role { get; set; } = null!;          // "Patient" | "Doctor" | "AmbulanceDriver"
        public string City { get; set; } = null!;
        public string Password { get; set; } = null!;

        // ─── Doctor Fields ────────────────────────────────────────────────
        public string? PmdcNumber { get; set; }
        public string? Specialization { get; set; }
        public int? Experience { get; set; }

        // Uploaded via Cloudinary on the frontend first; only the resulting URL is sent here.
        // Future: POST /api/upload → returns { url } → client stores in this field.
        public string? CertificateImageUrl { get; set; }

        // ─── Ambulance Driver Fields ──────────────────────────────────────
        public string? Cnic { get; set; }                  // Pakistani CNIC: 35202-XXXXXXX-X
        public string? MobileNumber { get; set; }
        public string? DrivingLicenseNumber { get; set; }

        // Same Cloudinary pattern as CertificateImageUrl above.
        public string? LicenseImageUrl { get; set; }

        public string? VehicleNumber { get; set; }
        public string? AmbulanceType { get; set; }         // e.g. "Basic Life Support (BLS)"
        public int? DriverExperience { get; set; }         // years
        public bool? HasOxygen { get; set; }
        public bool? HasStretcher { get; set; }
    }
}

/*
 ┌─────────────────────────────────────────────────────────────────────────┐
 │  CLOUDINARY UPLOAD STRATEGY (future implementation)                     │
 │                                                                         │
 │  1. Frontend picks a file (license image / certificate).                │
 │  2. Frontend calls your own backend: POST /api/upload                   │
 │     - Backend receives IFormFile, uploads to Cloudinary, returns URL.   │
 │  3. Frontend stores that URL in state.                                  │
 │  4. On form submit, LicenseImageUrl / CertificateImageUrl in DTO        │
 │     already contains the Cloudinary URL string — no binary data in DTO. │
 │                                                                         │
 │  This keeps RegisterDto clean (no IFormFile), makes the API JSON-only,  │
 │  and lets you validate/resize images server-side before storing them.   │
 └─────────────────────────────────────────────────────────────────────────┘
*/