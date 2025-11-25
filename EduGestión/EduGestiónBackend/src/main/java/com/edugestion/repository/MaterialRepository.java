package com.edugestion.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.edugestion.model.Material;

public interface MaterialRepository extends MongoRepository<Material, String> {
    List<Material> findByWorkshopId(String workshopId);
}

