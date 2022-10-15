package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;

//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/*
 * 유저 로그인 API ([POST] /api/auth/login) 요청에 필요한 리퀘스트 바디 정의
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@ApiModel("UserLoginPostRequest")
public class UserLoginPostReq {
//	@ApiModelProperty(name="유저 ID", example="ssafy")
	@JsonProperty("userId")
	private String userId;
//	@ApiModelProperty(name="유저 Password", example="your_password")
	@JsonProperty("password")
	private String password;
}
