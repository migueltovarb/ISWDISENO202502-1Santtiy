package com.edugestion.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.edugestion.model.Workshop;

public interface WorkshopRepository extends MongoRepository<Workshop, String> {
    List<Workshop> findByCategoryContainingIgnoreCase(String category);
    List<Workshop> findByTitleContainingIgnoreCase(String title);
    List<Workshop> findByInstructorId(String instructorId);
    List<Workshop> findByDateBetween(LocalDateTime start, LocalDateTime end);
}

