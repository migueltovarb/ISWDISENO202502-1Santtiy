package com.edugestion.dto;

import jakarta.validation.constraints.NotBlank;

public class EnrollRequest {
    @NotBlank
    private String workshopId;

    public String getWorkshopId() { return workshopId; }
    public void setWorkshopId(String workshopId) { this.workshopId = workshopId; }
}

