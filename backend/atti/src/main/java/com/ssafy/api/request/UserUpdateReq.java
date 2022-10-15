package com.ssafy.api.request;

import lombok.*;

@Getter
@Setter
public class UserUpdateReq {
	private String userId;
	private String password;
	private String userName;
	private String email;
	private String birth;
	private String phone;
}
