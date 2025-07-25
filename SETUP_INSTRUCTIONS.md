# Employee Registration System Setup

This guide will help you set up the complete employee registration system with Angular frontend and Spring Boot backend connected to MySQL database.

## Prerequisites

1. **Java 17 or higher** - for Spring Boot
2. **Node.js 18+** - for Angular
3. **MySQL 8.0+** - for database
4. **Maven** - for Spring Boot (included in project)

## Database Setup

1. **Install and start MySQL** (if not already installed)
2. **Create the database** by running the SQL script:
   ```sql
   mysql -u root -p < database-setup.sql
   ```
   Or manually run:
   ```sql
   CREATE DATABASE IF NOT EXISTS employee_management;
   ```

3. **Update database credentials** in `springboot-backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

## Backend Setup (Spring Boot)

1. **Navigate to backend directory**:
   ```bash
   cd springboot-backend
   ```

2. **Build the project**:
   ```bash
   ./mvnw clean install
   ```

3. **Run the Spring Boot application**:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Available API Endpoints

- `POST /api/employees/register` - Register new employee
- `GET /api/employees/check-email/{email}` - Check if email exists
- `GET /api/employees/check-badge/{badge}` - Check if badge exists

## Frontend Setup (Angular)

1. **Navigate to project root** (where package.json is):
   ```bash
   cd ..
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Angular development server**:
   ```bash
   npm start
   # or
   ng serve
   ```

The frontend will start on `http://localhost:4200`

## Testing the Application

1. **Open your browser** and go to `http://localhost:4200`
2. **Navigate to the signup page** (`/signup-employee`)
3. **Fill out the form** with the following validations:
   - **Email**: Must be in format `@ooredoo.tn`
   - **Phone**: Must start with `+` followed by country code and number
   - **Badge**: Must start with `BDG`
   - **Password**: Must be 8+ characters with uppercase, lowercase, digit, and special character
   - **Confirm Password**: Must match the password

4. **Submit the form** - if successful, you'll see a success message and be redirected to login after 2 seconds

## Troubleshooting

### Backend Issues

1. **Port 8080 already in use**:
   ```bash
   # Change port in application.properties
   server.port=8081
   ```

2. **Database connection failed**:
   - Verify MySQL is running
   - Check username/password in application.properties
   - Ensure database `employee_management` exists

3. **CORS errors**:
   - The SecurityConfig should handle CORS, but if issues persist, check the allowed origins

### Frontend Issues

1. **Port 4200 already in use**:
   ```bash
   ng serve --port 4201
   ```

2. **HTTP errors**:
   - Ensure backend is running on port 8080
   - Check browser console for detailed error messages

## Database Schema

The application will automatically create the following table structure:

```sql
employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    departement VARCHAR(255) NOT NULL,
    badge VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL (encrypted with BCrypt),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Security Features

- **Password Encryption**: Passwords are hashed using BCrypt
- **Unique Constraints**: Email and badge numbers must be unique
- **Input Validation**: Both frontend and backend validation
- **CORS Configuration**: Properly configured for development

## Production Considerations

1. **Environment Variables**: Use environment variables for database credentials
2. **HTTPS**: Enable HTTPS in production
3. **CORS**: Restrict CORS origins to your production domain
4. **Database User**: Create a dedicated database user with limited privileges
5. **Error Handling**: Implement proper error logging and monitoring

## Development Notes

- The frontend uses standalone Angular components
- The backend uses Spring Boot 3.5.3 with Spring Security
- Database migrations are handled automatically by Hibernate
- Form validation is implemented on both frontend and backend