using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
// Configure JWT Authentication (chain AddJwtBearer onto AddAuthentication)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(options =>
   {
       options.Authority = "http://localhost:8080/realms/sso-demo";
       options.RequireHttpsMetadata = false;

       options.TokenValidationParameters = new TokenValidationParameters
       {
           ValidateAudience = false,
           ValidateIssuer = true,
           ValidIssuer = "http://localhost:8080/realms/sso-demo",
           NameClaimType = "preferred_username",
           RoleClaimType = ClaimTypes.Role
       };

       // ? ADD THIS BLOCK (VERY IMPORTANT)
       options.Events = new JwtBearerEvents
       {
           OnTokenValidated = context =>
           {
               var identity = context.Principal.Identity as ClaimsIdentity;

               var realmAccess = context.Principal.FindFirst("realm_access")?.Value;

               if (realmAccess != null)
               {
                   var roles = System.Text.Json.JsonDocument.Parse(realmAccess)
                       .RootElement.GetProperty("roles");

                   foreach (var role in roles.EnumerateArray())
                   {
                       identity.AddClaim(new Claim(ClaimTypes.Role, role.GetString()));
                   }
               }

               return Task.CompletedTask;
           }
       };
   });

builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowReact");

// 2. Enable Authentication & Authorization Middleware
app.UseAuthentication();
app.UseAuthorization();

// 3. Define Endpoints

// Public endpoint just to verify the app is running
app.MapGet("/", () => "API is running. Request a token from Keycloak to access /secure or /profile.");

// Protected endpoint 1
app.MapGet("/secure", () => "Secure data accessed")
   .RequireAuthorization();

// Protected endpoint 2
app.MapGet("/profile", (ClaimsPrincipal user) =>
{
    var username = user.Claims
        .FirstOrDefault(c => c.Type == "preferred_username")?.Value;

    var email = user.Claims
        .FirstOrDefault(c => c.Type == "email")?.Value;

    return Results.Ok(new
    {
        Username = username,
        Email = email,
        Status = "Authenticated"
    });
}).RequireAuthorization();
app.MapGet("/admin", () => "Admin only data ??")
   .RequireAuthorization(new AuthorizeAttribute { Roles = "admin" });

app.Run();
