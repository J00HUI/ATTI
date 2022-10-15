package com.ssafy.api.response;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.depart.Post;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartJoinListRes extends BaseResponseBody{
	private List<CategoryListRes> categoryList = new ArrayList<CategoryListRes>();
	private Long departId;
	private List<PostViewAllRes> postList = new ArrayList<>();
	
	public static DepartJoinListRes of(Integer statusCode, String message, List<CategoryListRes> categoryList, Long departId, List<PostViewAllRes> postList) {
		DepartJoinListRes res = new DepartJoinListRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setCategoryList(categoryList);
		res.setDepartId(departId);
		res.setPostList(postList);
		return res;
	}
	
}
