package com.ssafy.api.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.FileDto;
import com.ssafy.db.entity.depart.File;
import com.ssafy.db.repository.FileRepository;

@Service
public class FileService {
	@Autowired
	private FileRepository fileRepository;

    @Transactional
    public Long saveFile(FileDto fileDto) {
        return fileRepository.save(fileDto.toEntity()).getFileId();
    }

    @Transactional
    public FileDto getFile(Long fileId) {
        File file = fileRepository.findById(fileId).get();

        FileDto fileDto = FileDto.builder()
        		.fileId(fileId)
        		.fileOrigin(file.getFileOrigin())
        		.fileNew(file.getFileNew())
        		.fileFolder(file.getFileFolder()).build();
        return fileDto;
    }
}
