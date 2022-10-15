package com.ssafy.api.request;

import javax.persistence.Entity;

import lombok.*;

@Getter
@AllArgsConstructor
public class KakaoUser {
	private String snsId;
	private String email;
	private String userName;
	private String birth;
}
