using Backend.Data;
using Backend.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- 0. LOAD ENVIRONMENT VARIABLES ---
// This must happen before we build the configuration
DotNetEnv.Env.Load();

// --- 1. INDUSTRIAL SERVICES SETUP ---

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register MongoDB Context
builder.Services.AddSingleton<MongoDbContext>();

// Register Email Helper
builder.Services.AddScoped<EmailHelper>();

// --- 2. CONFIGURE CORS (Connect React to .NET) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173") 
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// --- 3. CONFIGURE JWT AUTHENTICATION ---
// We pull the Key from Environment Variables first (Safety first!)
var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");

// If the key is missing, stop the server immediately with an error message
if (string.IsNullOrEmpty(jwtKey))
{
    throw new Exception("CRITICAL ERROR: JWT_KEY is not set in Environment Variables. The server cannot start safely.");
}



var key = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        // Pulling from config or Env
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        ValidateLifetime = true
    };
});

var app = builder.Build();

// --- 4. MIDDLEWARE PIPELINE ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Ensure CORS is before Auth
app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();