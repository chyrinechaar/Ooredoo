package com.example.demo.controller;

import com.example.demo.dto.EmployeeRegistrationDto;
import com.example.demo.model.Employee;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerEmployee(@RequestBody EmployeeRegistrationDto registrationDto) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate passwords match
            if (!registrationDto.getPassword().equals(registrationDto.getConfirmPassword())) {
                response.put("success", false);
                response.put("message", "Passwords do not match");
                return ResponseEntity.badRequest().body(response);
            }
            
            Employee employee = employeeService.registerEmployee(registrationDto);
            
            response.put("success", true);
            response.put("message", "Employee registered successfully");
            response.put("employeeId", employee.getId());
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred during registration");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Map<String, Boolean>> checkEmailExists(@PathVariable String email) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", employeeService.emailExists(email));
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/check-badge/{badge}")
    public ResponseEntity<Map<String, Boolean>> checkBadgeExists(@PathVariable String badge) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", employeeService.badgeExists(badge));
        return ResponseEntity.ok(response);
    }
}