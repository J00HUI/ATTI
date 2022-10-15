package com.ssafy.api.request;

import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DepartCreateReq {
	
	private String departName;	// 채널명
	
	private String userId;		// 관리자 ID
	
	@Builder
	public DepartCreateReq(String departName, String userId) {
		this.departName = departName;
		this.userId = userId;
	}
	
	public Depart toEntity(User user, String departCode) {
		return Depart.builder()
				.departName(departName)
				.departCode(departCode)
				.user(user)
				.build();
	}
}
