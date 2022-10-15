package com.ssafy.db.entity.depart;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 첨부 파일
 */

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class File {
	
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="file_id")
	private Long fileId;					// 첨부 파일 ID
	
	@Column(name="file_origin")
	private String fileOrigin;				// 원본 파일명
	
	@Column(name="file_new")
	private String fileNew;					// 새 파일명
	
	@Column(name="file_folder")
	private String fileFolder;				// 저장 폴더
	
	@Column(name="post_title")
	private String postTitle;
	
	@Column(name="post_reg_date")
	private LocalDateTime postRegDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	@JsonIgnore
	private User user;	
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="category_id")
	private Category category;	
    
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="depart_id")
	private Depart depart;
	/////////////////////////////////////////////////////// 
}
