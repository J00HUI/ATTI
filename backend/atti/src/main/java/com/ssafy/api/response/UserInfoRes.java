package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;

import lombok.*;
@Getter
@Setter
public class UserInfoRes extends BaseResponseBody{
	private String userName;
	private String email;
	private String birth;
	private String phone;
	
	public static UserInfoRes of(Integer statusCode, String message, String userName, String email, String birth, String phone) {
		UserInfoRes res = new UserInfoRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setUserName(userName);
		res.setEmail(email);
		res.setBirth(birth);
		res.setPhone(phone);
		return res;
	}
	
}
