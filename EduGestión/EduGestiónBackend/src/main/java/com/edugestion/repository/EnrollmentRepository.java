package com.edugestion.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.edugestion.model.Enrollment;

public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    List<Enrollment> findByWorkshopId(String workshopId);
    List<Enrollment> findByStudentId(String studentId);
}

