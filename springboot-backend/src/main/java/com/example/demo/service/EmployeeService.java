package com.example.demo.service;

import com.example.demo.dto.EmployeeRegistrationDto;
import com.example.demo.dto.EmployeeResponseDto;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public EmployeeResponseDto registerEmployee(EmployeeRegistrationDto registrationDto) {
        // Check if email already exists
        if (employeeRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        // Check if badge already exists
        if (employeeRepository.existsByBadge(registrationDto.getBadge())) {
            throw new RuntimeException("Badge already exists");
        }
        
        // Create new employee
        Employee employee = new Employee();
        employee.setFirstName(registrationDto.getFirstName());
        employee.setLastName(registrationDto.getLastName());
        employee.setEmail(registrationDto.getEmail());
        employee.setPhoneNumber(registrationDto.getPhoneNumber());
        employee.setCity(registrationDto.getCity());
        employee.setDepartement(registrationDto.getDepartement());
        employee.setBadge(registrationDto.getBadge());
        
        // Encrypt password
        employee.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        
        // Save employee
        Employee savedEmployee = employeeRepository.save(employee);
        
        // Convert to response DTO
        return convertToResponseDto(savedEmployee);
    }
    
    public List<EmployeeResponseDto> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    public Optional<EmployeeResponseDto> getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map(this::convertToResponseDto);
    }
    
    public Optional<EmployeeResponseDto> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email)
                .map(this::convertToResponseDto);
    }
    
    public Optional<EmployeeResponseDto> getEmployeeByBadge(String badge) {
        return employeeRepository.findByBadge(badge)
                .map(this::convertToResponseDto);
    }
    
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
    
    private EmployeeResponseDto convertToResponseDto(Employee employee) {
        EmployeeResponseDto responseDto = new EmployeeResponseDto();
        responseDto.setId(employee.getId());
        responseDto.setFirstName(employee.getFirstName());
        responseDto.setLastName(employee.getLastName());
        responseDto.setEmail(employee.getEmail());
        responseDto.setPhoneNumber(employee.getPhoneNumber());
        responseDto.setCity(employee.getCity());
        responseDto.setDepartement(employee.getDepartement());
        responseDto.setBadge(employee.getBadge());
        responseDto.setCreatedAt(employee.getCreatedAt());
        responseDto.setUpdatedAt(employee.getUpdatedAt());
        return responseDto;
    }
}