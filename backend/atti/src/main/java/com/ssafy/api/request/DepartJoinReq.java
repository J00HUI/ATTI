package com.ssafy.api.request;

import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartJoinReq {
	
	private String departCode;
	
	private String userId;
	
	public Depart toEntity(User user) {
		return Depart.builder()
				.departCode(departCode)
				.user(user)
				.build();
	}
}
