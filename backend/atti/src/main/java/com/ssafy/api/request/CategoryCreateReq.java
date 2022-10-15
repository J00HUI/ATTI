package com.ssafy.api.request;


import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.fasterxml.jackson.annotation.JsonValue;
import com.ssafy.db.entity.depart.Ctype;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryCreateReq {
	
	private String categoryName;
	
	private String type;
	
	private boolean categoryAnoInfo;
	
	private boolean categoryComInfo;
	
	private boolean categoryComAnoInfo;
	
	private String userId;
	
	private Long departId;
	
	// 무덤 5개째
//	public Category toEntity(User user, Depart depart) {
//		return Category.builder()
//				.categoryName(categoryName)
//				.ctype(cType)
//				.categoryAnoInfo(categoryAnoInfo)
//				.categoryComInfo(categoryComInfo)
//				.categoryComAnoInfo(categoryComAnoInfo)
//				.user(user)
//				.depart(depart)
//				.build();
//	}
}
