package com.ssafy.api.request;

import java.util.Date;

import lombok.*;

@Getter
@Setter
public class UserFindIdReq {
	private String name;
	private String email;
}
