package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class CourseAttendenceRes {
	private String userId;
	private String userName;
}
