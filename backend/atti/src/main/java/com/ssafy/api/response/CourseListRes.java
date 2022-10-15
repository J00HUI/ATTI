package com.ssafy.api.response;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.common.model.response.BaseResponseBody;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseListRes extends BaseResponseBody{
	List<CourseGetRes> courseResList = new ArrayList<>();
	
	public static CourseListRes of(Integer statusCode, String message, List<CourseGetRes> list) {
		CourseListRes res = new CourseListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setCourseResList(list);
		return res;
	}
}
