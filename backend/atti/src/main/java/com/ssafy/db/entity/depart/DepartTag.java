package com.ssafy.db.entity.depart;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * 채널 해시 태그
 */
@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartTag {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="depart_tag_id")
	private Long departTagId;						// 해시 태그 ID
	
	@Column(name="depart_tag_name")
	private String departTagName;					// 해시 태그 명 
}
