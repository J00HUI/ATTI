package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;

import lombok.*;

@Getter
@Setter
public class FindIdRes extends BaseResponseBody {
	String userId;
	
	public static FindIdRes of(Integer statusCode, String message, String userId) {
		FindIdRes res = new FindIdRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setUserId(userId);
		return res;
	}
}
