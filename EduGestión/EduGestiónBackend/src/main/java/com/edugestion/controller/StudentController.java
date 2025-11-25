package com.edugestion.controller;

import com.edugestion.dto.EnrollRequest;
import com.edugestion.dto.PaymentRequest;
import com.edugestion.model.Certificate;
import com.edugestion.model.Enrollment;
import com.edugestion.model.Payment;
import com.edugestion.model.Workshop;
import com.edugestion.repository.WorkshopRepository;
import com.edugestion.service.CertificateService;
import com.edugestion.service.EnrollmentService;
import com.edugestion.service.PaymentService;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final WorkshopRepository workshopRepository;
    private final EnrollmentService enrollmentService;
    private final PaymentService paymentService;
    private final CertificateService certificateService;

    public StudentController(WorkshopRepository workshopRepository, EnrollmentService enrollmentService, PaymentService paymentService, CertificateService certificateService) {
        this.workshopRepository = workshopRepository;
        this.enrollmentService = enrollmentService;
        this.paymentService = paymentService;
        this.certificateService = certificateService;
    }

    @GetMapping("/workshops")
    public List<Workshop> listWorkshops(@RequestParam(required = false) String categoria,
                                        @RequestParam(required = false) String nombre,
                                        @RequestParam(required = false) String ponente,
                                        @RequestParam(required = false) LocalDateTime desde,
                                        @RequestParam(required = false) LocalDateTime hasta) {
        if (categoria != null) return workshopRepository.findByCategoryContainingIgnoreCase(categoria);
        if (nombre != null) return workshopRepository.findByTitleContainingIgnoreCase(nombre);
        if (ponente != null) return workshopRepository.findByInstructorId(ponente);
        if (desde != null && hasta != null) return workshopRepository.findByDateBetween(desde, hasta);
        return workshopRepository.findAll();
    }

    @PostMapping("/enroll")
    public Enrollment enroll(@Valid @RequestBody EnrollRequest request, Authentication auth) {
        String studentEmail = auth.getName();
        return enrollmentService.enroll(request.getWorkshopId(), studentEmail);
    }

    @PostMapping("/payments")
    public Payment pay(@Valid @RequestBody PaymentRequest request, Authentication auth) {
        String studentEmail = auth.getName();
        return paymentService.process(studentEmail, request);
    }

    @PostMapping("/certificates/issue")
    public Certificate issue(@RequestParam String workshopId, Authentication auth) {
        String studentEmail = auth.getName();
        return certificateService.issue(studentEmail, workshopId);
    }
}

