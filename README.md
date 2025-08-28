# CountryApp

A full-stack application with a **.NET 8 backend API** and **Angular 20 frontend**, providing country data. Includes a CI/CD pipeline for automated testing, building, and packaging.

## Repository Structure
CountryApp/
├── CountryApi/ # .NET 8 backend API
├── country-app/ # Angular frontend
├── .github/ # GitHub Actions workflows
├── README.md
└── .gitignore

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js 20+](https://nodejs.org/) and npm
- Angular CLI 20+ (`npm install -g @angular/cli`)

## Backend Setup (CountryApi)

1. Navigate to the backend folder:
    ```bash
    cd CountryApi
    ```

2. Restore dependencies:
    ```bash
    dotnet restore
    ```

3. Build the project:
    ```bash
    dotnet build --configuration Release
    ```

4. Run the backend API:
    ```bash
    dotnet run --project Country.Api
    ```

5. Run backend tests:
    ```bash
    dotnet test --no-build --verbosity normal
    ```

## Frontend Setup (Angular)

1. Navigate to the frontend folder:
    ```bash
    cd country-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run frontend in development mode:
    ```bash
    ng serve
    ```
    Open your browser at: [http://localhost:4200](http://localhost:4200)

4. Run frontend tests:
    ```bash
    npm test -- --watch=false --browsers=ChromeHeadless
    ```

5. Build for production:
    ```bash
    npm run build -- --configuration production
    ```

## Swagger Documentation

The backend API includes Swagger documentation at `/swagger`.

### Endpoints

- `GET /countries`
- `GET /countries/{name}`

## Contributing

We welcome contributions to CountryApp! To get started:

1. **Fork the repository** and create your branch from `main`.
2. **Follow coding standards**:
    - Backend: Use C# conventions and .NET 8 best practices.
    - Frontend: Follow Angular style guidelines.
3. **Write tests** for new features or bug fixes.
4. **Submit a pull request** with a clear description of your changes.

Please check for existing issues before opening new ones. For major changes, open an issue first to discuss your proposal.

Thank you for helping improve CountryApp!

