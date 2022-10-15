package com.ssafy.db.entity.user;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 프로필 이미지
 */

@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="profile_id")
	private Long profilId;					// 프로필 이미지 ID
	
	@Column(name="profile_origin")
	private String profileOrigin;			// 원본 파일명
	
	@Column(name="profile_new")
	private String profileNew;				// 새 파일명
	
	@Column(name="profile_folder")
	private String profileFolder;			// 저장 폴더
	
	@OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
	private User user;						// 회원 ID (FK)
	

}
