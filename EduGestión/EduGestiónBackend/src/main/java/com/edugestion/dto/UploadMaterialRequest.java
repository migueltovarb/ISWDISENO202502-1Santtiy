package com.edugestion.dto;

import jakarta.validation.constraints.NotBlank;

public class UploadMaterialRequest {
    @NotBlank
    private String workshopId;
    @NotBlank
    private String type;
    @NotBlank
    private String url;
    @NotBlank
    private String title;
    private String description;

    public String getWorkshopId() { return workshopId; }
    public void setWorkshopId(String workshopId) { this.workshopId = workshopId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}

