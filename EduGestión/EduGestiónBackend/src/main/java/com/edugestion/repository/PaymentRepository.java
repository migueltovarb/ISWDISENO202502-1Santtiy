package com.edugestion.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.edugestion.model.Payment;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByStudentId(String studentId);
    List<Payment> findByWorkshopId(String workshopId);
}

