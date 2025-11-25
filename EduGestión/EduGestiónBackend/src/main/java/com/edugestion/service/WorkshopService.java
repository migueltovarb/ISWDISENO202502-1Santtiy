package com.edugestion.service;

import java.util.List;
import com.edugestion.dto.CreateWorkshopRequest;
import com.edugestion.dto.UpdateWorkshopRequest;
import com.edugestion.model.Workshop;
import com.edugestion.repository.WorkshopRepository;
import org.springframework.stereotype.Service;

@Service
public class WorkshopService {
    private final WorkshopRepository workshopRepository;

    public WorkshopService(WorkshopRepository workshopRepository) {
        this.workshopRepository = workshopRepository;
    }

    public List<Workshop> list() { return workshopRepository.findAll(); }

    public Workshop create(CreateWorkshopRequest request) {
        Workshop w = new Workshop();
        w.setTitle(request.getTitle());
        w.setCategory(request.getCategory());
        w.setDate(request.getDate());
        w.setMaxSeats(request.getMaxSeats());
        w.setInstructorId(request.getInstructorId());
        return workshopRepository.save(w);
    }

    public Workshop update(String id, UpdateWorkshopRequest request) {
        Workshop w = workshopRepository.findById(id).orElseThrow();
        w.setTitle(request.getTitle());
        w.setCategory(request.getCategory());
        w.setDate(request.getDate());
        w.setMaxSeats(request.getMaxSeats());
        return workshopRepository.save(w);
    }

    public void delete(String id) { workshopRepository.deleteById(id); }
}

