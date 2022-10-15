package com.ssafy.api.request;

import com.ssafy.db.entity.depart.File;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Builder
public class FileDto {
	private Long fileId;
    private String fileOrigin;
    private String fileNew;
    private String fileFolder;
    
    public File toEntity() {
        File build = File.builder()
        		.fileId(fileId)
                .fileOrigin(fileOrigin)
                .fileNew(fileNew)
                .fileFolder(fileFolder)
                .build();
        return build;
    }
    
    public FileDto(Long fileId, String fileOrigin, String fileNew, String fileFolder) {
        this.fileId = fileId;
        this.fileOrigin = fileOrigin;
        this.fileNew = fileNew;
        this.fileFolder = fileFolder;
    }
}
