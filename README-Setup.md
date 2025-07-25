# Employee Management System Setup Guide

This guide will help you set up and run the Employee Management System with Angular frontend and Spring Boot backend.

## Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **Angular CLI 17** or higher

## Database Setup

1. **Install MySQL** (if not already installed)
2. **Create the database**:
   ```sql
   mysql -u root -p
   source setup-database.sql
   ```
   
3. **Update database credentials** in `springboot-backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/employee_management
   spring.datasource.username=root
   spring.datasource.password=your_actual_password
   ```

## Backend Setup (Spring Boot)

1. **Navigate to backend directory**:
   ```bash
   cd springboot-backend
   ```

2. **Install dependencies and run**:
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

   Or if using Windows:
   ```bash
   mvnw.cmd clean install
   mvnw.cmd spring-boot:run
   ```

3. **Verify backend is running**:
   - The backend will run on `http://localhost:8080`
   - Check `http://localhost:8080/api/employees` (should return empty array)

## Frontend Setup (Angular)

1. **Navigate to frontend directory**:
   ```bash
   cd .. # if you're in springboot-backend directory
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the Angular application**:
   ```bash
   ng serve
   ```

4. **Access the application**:
   - Frontend runs on `http://localhost:4200`
   - Navigate to signup-employee: `http://localhost:4200/signup-employee`

## Testing the Integration

1. **Open the signup form**: `http://localhost:4200/signup-employee`

2. **Fill out the form with valid data**:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@ooredoo.tn
   - Phone: +21612345678
   - City: Tunis
   - Department: Informatique
   - Badge: BDG001
   - Password: Password123!
   - Confirm Password: Password123!

3. **Submit the form** - you should see a success message

4. **Check the database**:
   ```sql
   USE employee_management;
   SELECT * FROM employees;
   ```

## API Endpoints

The backend provides the following REST endpoints:

- `POST /api/employees/register` - Register a new employee
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `GET /api/employees/email/{email}` - Get employee by email
- `GET /api/employees/badge/{badge}` - Get employee by badge
- `DELETE /api/employees/{id}` - Delete employee

## IntelliJ IDEA Setup

1. **Open the project in IntelliJ**:
   - File → Open → Select the `springboot-backend` folder

2. **Configure the project**:
   - IntelliJ should automatically detect it as a Maven project
   - Wait for Maven to download dependencies

3. **Run configuration**:
   - Right-click on `DemoApplication.java`
   - Select "Run 'DemoApplication'"

4. **Database connection in IntelliJ** (optional):
   - Go to Database tool window
   - Add MySQL data source
   - Use connection details from application.properties

## VS Code Integration

The Angular frontend can be developed in VS Code:

1. **Open the root project folder in VS Code**
2. **Install recommended extensions**:
   - Angular Language Service
   - TypeScript Hero
   - REST Client (for testing APIs)

3. **Use integrated terminal** to run Angular commands

## Troubleshooting

### Backend Issues
- **Port 8080 already in use**: Change `server.port` in application.properties
- **Database connection error**: Verify MySQL is running and credentials are correct
- **Compilation errors**: Ensure Java 17+ is being used

### Frontend Issues
- **CORS errors**: Backend has CORS configured for localhost:4200
- **HTTP client errors**: Ensure HttpClient is properly configured in app.config.ts
- **Module errors**: Run `npm install` to ensure all dependencies are installed

### Common Validation Errors
- **Email**: Must end with @ooredoo.tn
- **Phone**: Must start with + followed by country code and number
- **Badge**: Must start with "BDG"
- **Password**: Must contain uppercase, lowercase, digit, and special character (min 8 chars)

## Development Workflow

1. **Start backend**: `cd springboot-backend && ./mvnw spring-boot:run`
2. **Start frontend**: `ng serve`
3. **Make changes** to either frontend or backend
4. **Test the integration** using the signup form
5. **Check database** to verify data is saved correctly

The system is now ready for development!