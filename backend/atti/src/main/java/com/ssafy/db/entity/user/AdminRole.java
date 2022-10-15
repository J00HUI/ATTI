package com.ssafy.db.entity.user;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.db.entity.depart.Depart;

import lombok.*;

/* 
 *  관리자 
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class AdminRole {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="admin_role_id")
	private Long AdminRoleId;			// 관리자 권한 ID 
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="depart_id")
	private Depart depart;				// 채널 ID (FK)
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;					// 관리자 ID (FK)
	
}
