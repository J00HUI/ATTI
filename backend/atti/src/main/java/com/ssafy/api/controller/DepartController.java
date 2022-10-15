package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.CategoryCreateReq;
import com.ssafy.api.request.DepartCreateReq;
import com.ssafy.api.request.DepartJoinReq;
import com.ssafy.api.request.ViewAllPostsReq;
import com.ssafy.api.response.CategoryListRes;
import com.ssafy.api.response.DepartJoinListRes;
import com.ssafy.api.response.PostViewAllRes;
import com.ssafy.api.response.UserInfoRes;
import com.ssafy.api.service.CategoryService;
import com.ssafy.api.service.DepartService;
import com.ssafy.api.service.PostService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.Post;

@RestController // depart/{depart_code}/category/{category_name}/post
@RequestMapping("/depart")
public class DepartController {
	
	@Autowired
	private DepartService departService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/create") // 채널 생성
	public ResponseEntity<List<CategoryListRes>> createChannel(@RequestBody DepartCreateReq departCreateReq) {
		System.out.println("===========================" + departCreateReq.getDepartName() + "=============================");
		System.out.println("===========================" + departCreateReq.getUserId() + "=============================");
		Long departId = departService.createChannel(departCreateReq);
		
		List<CategoryListRes> categoryList = categoryService.getCategoryList(departId);
		
		return new ResponseEntity<List<CategoryListRes>>(categoryList, HttpStatus.OK);
	}
	
	@GetMapping("/{departCode}/{userId}") // 채널 입장 
	public ResponseEntity<? extends BaseResponseBody> joinChannel(@PathVariable String departCode, @PathVariable String userId) {
//		System.out.println("===========================" + departId + "=============================");
		
		// 0. 채널 코드와 일치하는 채널 찾기
		Long departId = departService.getDepartIdByCode(departCode);
		if(departId == null)
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "채널 코드와 일치하는 채널이 없습니다."));
		
		// 1. 이미 가입된 회원인지 찾기
		boolean isOnChannelUser = departService.isOnChannelUser(departId, userId);
		
		if(isOnChannelUser)
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "이미 가입된 회원입니다."));
		
		// 2. 채널 가입하고 가입한 채널의 카테고리 리스트 리턴
		List<CategoryListRes> categoryList = departService.joinChannel(departCode, userId);
		
		if(categoryList == null)
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "채널 코드와 일치하는 채널이 없습니다."));
		
		Long categoryId = categoryList.get(0).getCategoryId();
		Category category = categoryService.getByCategoryId(categoryId);
		
		// 3. 첫 번째 카테고리의 글 목록 리턴
		List<PostViewAllRes> postList = postService.viewAllPosts(departId, categoryId, userId);
		
		return ResponseEntity.status(200).body(DepartJoinListRes.of(200, "success",categoryList, departId, postList));
	}
	
	@GetMapping("/{departId}/category/{categoryId}/user/{userId}") // 게시글 전체 조회
	public ResponseEntity<List<PostViewAllRes>> viewAllPosts(@PathVariable Long departId, @PathVariable Long categoryId, @PathVariable String userId) {
		System.out.println("===========================" + departId + "=============================");
		System.out.println("===========================" + categoryId + "=============================");
		return new ResponseEntity<List<PostViewAllRes>>(postService.viewAllPosts(departId, categoryId, userId), HttpStatus.OK);
	}
	
	// 카테고리 생성
	@PostMapping("/category/create")
	public ResponseEntity<Long> createCategory(@RequestBody CategoryCreateReq categoryCreateReq) {
		System.out.println("=========================");
		System.out.println("cType :"+ categoryCreateReq.getType());
		System.out.println(categoryCreateReq.getCategoryName());
		System.out.println("=========================");
		
//		categoryService.createCategory(categoryCreateReq);
		return new ResponseEntity<Long>(categoryService.createCategory(categoryCreateReq), HttpStatus.OK);
	}
	
	// 채널 클릭 시 카테고리 리스트 리턴
	@GetMapping("/getCategoryList/{departId}")
	public ResponseEntity<List<CategoryListRes>> getCategoryList(@PathVariable("departId") Long departId){
		List<CategoryListRes> list = categoryService.getCategoryList(departId);
		if(list == null)
			new ResponseEntity<String>("잘못된 채널 아이디이거나 해당하는 카테고리 리스트가 없습니다.", HttpStatus.OK);
		return new ResponseEntity<List<CategoryListRes>>(list, HttpStatus.OK);
	}
}
