package com.edugestion.service;

import java.util.List;
import com.edugestion.dto.UploadMaterialRequest;
import com.edugestion.model.Material;
import com.edugestion.repository.MaterialRepository;
import org.springframework.stereotype.Service;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public Material upload(UploadMaterialRequest request) {
        Material m = new Material();
        m.setWorkshopId(request.getWorkshopId());
        m.setType(request.getType());
        m.setUrl(request.getUrl());
        m.setTitle(request.getTitle());
        m.setDescription(request.getDescription());
        return materialRepository.save(m);
    }

    public List<Material> listByWorkshop(String workshopId) { return materialRepository.findByWorkshopId(workshopId); }
}

