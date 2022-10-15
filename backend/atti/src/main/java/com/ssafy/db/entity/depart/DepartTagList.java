package com.ssafy.db.entity.depart;

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
 * [중계 테이블]
 * 채널 해시 태그 리스트
 */
@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartTagList {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="depart_tag_list_id")
	private Long departTagListId;			// 채널 태그 리스트 ID
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="depart_id")
	private Depart depart;					// 채널 ID (FK)

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="depart_tag_id")
	private DepartTag departTag;			// 채널 태그 ID (FK)
	
}