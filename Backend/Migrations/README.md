EF Core migrations for AeroRoute

To create the initial migration and apply it locally run (PowerShell):

dotnet tool install --global dotnet-ef --version 8.0.13
dotnet ef migrations add InitialCreate --project "AeroRoute API.csproj" --startup-project "AeroRoute API.csproj"
dotnet ef database update --project "AeroRoute API.csproj" --startup-project "AeroRoute API.csproj"

If running from Visual Studio Package Manager Console, set Default project to the web project and run:
Add-Migration InitialCreate
Update-Database
