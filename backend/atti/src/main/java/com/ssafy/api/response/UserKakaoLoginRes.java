package com.ssafy.api.response;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.common.model.response.BaseResponseBody;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserKakaoLoginRes extends BaseResponseBody {
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
	// 유저 아이디
	String userId;
	
	public static UserKakaoLoginRes of(Integer statusCode, String message, String accessToken, List<UserDepartRes> departList, List<CategoryListRes> categoryList, List<PostViewAllRes> postList, boolean admin, String userName, String userId) {
		UserKakaoLoginRes res = new UserKakaoLoginRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
		res.setDepartList(departList);
		res.setCategoryList(categoryList);
		res.setPostList(postList);
		res.setAdmin(admin);
		res.setUserName(userName);
		res.setUserId(userId);
		return res;
	}
}
