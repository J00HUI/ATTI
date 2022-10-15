package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CategoryListRes {
	private Long departId;
	private String departName;
	private Long categoryId;
	private String categoryName;
	private String cType;
	private boolean categoryAnoInfo;
	private boolean categoryComInfo;
	private boolean categoryComAnoInfo;
	private String userId;
}
