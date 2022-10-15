package com.ssafy.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AttendanceRes {
	private String userId;
	private String userName;
	private String attendancedContent;
}
