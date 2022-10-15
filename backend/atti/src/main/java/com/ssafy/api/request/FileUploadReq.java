package com.ssafy.api.request;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.File;
import com.ssafy.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileUploadReq {
	
	private Long fileId;
    private String fileOrigin;
    private String fileNew;
    private String fileFolder;
    
    private String postTitle;
    private LocalDateTime postRegDate;
    
    private String userId;
    private Long categoryId;
    private Long departId;
	
}
