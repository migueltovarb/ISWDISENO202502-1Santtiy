package com.edugestion.service;

import java.time.LocalDateTime;
import java.util.List;
import com.edugestion.dto.PaymentRequest;
import com.edugestion.model.Payment;
import com.edugestion.repository.PaymentRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment process(String studentId, PaymentRequest request) {
        Payment p = new Payment();
        p.setStudentId(studentId);
        p.setWorkshopId(request.getWorkshopId());
        p.setAmount(request.getAmount());
        p.setCurrency(request.getCurrency());
        p.setStatus("PAID");
        p.setTransactionId("SIMULATED");
        p.setCreatedAt(LocalDateTime.now());
        return paymentRepository.save(p);
    }

    public List<Payment> listByStudent(String studentId) { return paymentRepository.findByStudentId(studentId); }
    public List<Payment> listByWorkshop(String workshopId) { return paymentRepository.findByWorkshopId(workshopId); }
}

