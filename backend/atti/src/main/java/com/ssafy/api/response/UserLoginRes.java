package com.ssafy.api.response;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.common.model.response.BaseResponseBody;

//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 유저 로그인 API ([POST] /api/auth/login) 요청에 대한 응답값 정의.
 */

@Getter
@Setter
//@ApiModel("UserLoginPostResponse")
public class UserLoginRes extends BaseResponseBody {
//	@ApiModelProperty(name="JWT 인증 토큰" , example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;
	
	// 가입한 채널 리스트
	List<UserDepartRes> departList = new ArrayList<>();
	// 채널 리스트의 첫 번쨰 카테고리 리스트
	List<CategoryListRes> categoryList = new ArrayList<>();
	// 첫 번째 카테고리의 글 목록
	List<PostViewAllRes> postList = new ArrayList<>();
	// 유저 권한
	boolean admin;
	
	// 유저 이름
	String userName;
	
	public static UserLoginRes of(Integer statusCode, String message, String accessToken, List<UserDepartRes> departList, List<CategoryListRes> categoryList, List<PostViewAllRes> postList, boolean admin, String userName) {
		UserLoginRes res = new UserLoginRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		res.setDepartList(departList);
		res.setCategoryList(categoryList);
		res.setPostList(postList);
		res.setAdmin(admin);
		res.setUserName(userName);
		
		return res;
	}
	
	public static UserLoginRes failOf(Integer statusCode, String message) {
		UserLoginRes res = new UserLoginRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		return res;
	}
}
