package com.edugestion.service;

import java.util.List;
import com.edugestion.model.Enrollment;
import com.edugestion.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public Enrollment enroll(String workshopId, String studentId) {
        Enrollment e = new Enrollment();
        e.setWorkshopId(workshopId);
        e.setStudentId(studentId);
        e.setStatus("ENROLLED");
        return enrollmentRepository.save(e);
    }

    public List<Enrollment> listByWorkshop(String workshopId) { return enrollmentRepository.findByWorkshopId(workshopId); }
}

