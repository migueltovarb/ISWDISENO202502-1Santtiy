package com.edugestion.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.edugestion.model.Certificate;

public interface CertificateRepository extends MongoRepository<Certificate, String> {
    List<Certificate> findByStudentId(String studentId);
    List<Certificate> findByWorkshopId(String workshopId);
}

