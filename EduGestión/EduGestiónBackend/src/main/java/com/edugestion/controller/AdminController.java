package com.edugestion.controller;

import com.edugestion.dto.CreateUserRequest;
import com.edugestion.dto.CreateWorkshopRequest;
import com.edugestion.dto.UpdateUserRequest;
import com.edugestion.dto.UpdateWorkshopRequest;
import com.edugestion.model.Certificate;
import com.edugestion.model.Material;
import com.edugestion.model.Payment;
import com.edugestion.model.User;
import com.edugestion.model.Workshop;
import com.edugestion.service.CertificateService;
import com.edugestion.service.MaterialService;
import com.edugestion.service.PaymentService;
import com.edugestion.service.UserService;
import com.edugestion.service.WorkshopService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserService userService;
    private final WorkshopService workshopService;
    private final MaterialService materialService;
    private final PaymentService paymentService;
    private final CertificateService certificateService;

    public AdminController(UserService userService, WorkshopService workshopService, MaterialService materialService, PaymentService paymentService, CertificateService certificateService) {
        this.userService = userService;
        this.workshopService = workshopService;
        this.materialService = materialService;
        this.paymentService = paymentService;
        this.certificateService = certificateService;
    }

    @GetMapping("/users")
    public List<User> listUsers() { return userService.list(); }

    @PostMapping("/users")
    public User createUser(@Valid @RequestBody CreateUserRequest request) { return userService.create(request); }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable String id, @Valid @RequestBody UpdateUserRequest request) { return userService.update(id, request); }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) { userService.delete(id); return ResponseEntity.noContent().build(); }

    @GetMapping("/workshops")
    public List<Workshop> listWorkshops() { return workshopService.list(); }

    @PostMapping("/workshops")
    public Workshop createWorkshop(@Valid @RequestBody CreateWorkshopRequest request) { return workshopService.create(request); }

    @PutMapping("/workshops/{id}")
    public Workshop updateWorkshop(@PathVariable String id, @Valid @RequestBody UpdateWorkshopRequest request) { return workshopService.update(id, request); }

    @DeleteMapping("/workshops/{id}")
    public ResponseEntity<Void> deleteWorkshop(@PathVariable String id) { workshopService.delete(id); return ResponseEntity.noContent().build(); }

    @GetMapping("/materials/{workshopId}")
    public List<Material> listMaterials(@PathVariable String workshopId) { return materialService.listByWorkshop(workshopId); }

    @GetMapping("/payments/students/{studentId}")
    public List<Payment> listPaymentsByStudent(@PathVariable String studentId) { return paymentService.listByStudent(studentId); }

    @GetMapping("/payments/workshops/{workshopId}")
    public List<Payment> listPaymentsByWorkshop(@PathVariable String workshopId) { return paymentService.listByWorkshop(workshopId); }

    @PostMapping("/certificates/issue")
    public Certificate issueCertificate(@RequestParam String studentId, @RequestParam String workshopId) { return certificateService.issue(studentId, workshopId); }
}

