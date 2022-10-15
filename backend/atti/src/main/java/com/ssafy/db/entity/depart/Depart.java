package com.ssafy.db.entity.depart;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.ssafy.db.entity.user.User;
import com.ssafy.db.entity.webclass.Course;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 *  채널
 */
@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Depart {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="depart_id")
	private Long departId;					// 채널 ID
	
	@Column(name="depart_name")
	private String departName;				// 채널 명
	
	@Column(name="depart_code")
	private String departCode;				// 채널코드 (초대 코드)
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;						// 회원 ID 
	
}
