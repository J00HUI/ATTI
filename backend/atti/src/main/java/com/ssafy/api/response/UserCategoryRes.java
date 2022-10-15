package com.ssafy.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserCategoryRes {
	private Long CategoryId;
	private String CategoryName;
}
