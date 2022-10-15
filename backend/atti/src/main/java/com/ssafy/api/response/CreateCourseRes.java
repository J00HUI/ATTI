package com.ssafy.api.response;

import org.springframework.stereotype.Service;

import com.ssafy.common.model.response.BaseResponseBody;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCourseRes extends BaseResponseBody{
	Long courseId;
	
	public static CreateCourseRes of(Integer statusCode, String message, Long courseId) {
		CreateCourseRes res = new CreateCourseRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setCourseId(courseId);
		return res;
	}
}
