package com.edugestion.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import com.edugestion.model.Certificate;
import com.edugestion.repository.CertificateRepository;
import org.springframework.stereotype.Service;

@Service
public class CertificateService {
    private final CertificateRepository certificateRepository;

    public CertificateService(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    public Certificate issue(String studentId, String workshopId) {
        Certificate c = new Certificate();
        c.setStudentId(studentId);
        c.setWorkshopId(workshopId);
        c.setIssueDate(LocalDateTime.now());
        c.setCode(UUID.randomUUID().toString());
        return certificateRepository.save(c);
    }

    public List<Certificate> listByStudent(String studentId) { return certificateRepository.findByStudentId(studentId); }
}

