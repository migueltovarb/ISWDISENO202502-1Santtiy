package com.edugestion.controller;

import com.edugestion.dto.UploadMaterialRequest;
import com.edugestion.model.Enrollment;
import com.edugestion.model.Material;
import com.edugestion.service.EnrollmentService;
import com.edugestion.service.MaterialService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/instructor")
public class InstructorController {
    private final MaterialService materialService;
    private final EnrollmentService enrollmentService;

    public InstructorController(MaterialService materialService, EnrollmentService enrollmentService) {
        this.materialService = materialService;
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/materials")
    public Material uploadMaterial(@Valid @RequestBody UploadMaterialRequest request, Authentication auth) {
        return materialService.upload(request);
    }

    @GetMapping("/workshops/{id}/students")
    public List<Enrollment> listStudents(@PathVariable String id) {
        return enrollmentService.listByWorkshop(id);
    }
}

