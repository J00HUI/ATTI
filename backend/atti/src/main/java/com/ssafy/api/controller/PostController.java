package com.ssafy.api.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.PostUpdateReq;
import com.ssafy.api.request.PostWriteReq;
import com.ssafy.api.response.PostViewOneRes;
import com.ssafy.api.service.PostService;
import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.user.User;


@RestController
@RequestMapping("/post")
public class PostController {
	
	@Autowired
	private PostService postService;
	
//	@GetMapping() // 게시글 전체 조회
//	public ResponseEntity<List<PostViewAllRes>> viewAllPosts(@PathVariable Long departId, @PathVariable Long categoryId) {
//		return new ResponseEntity<List<PostViewAllRes>>(postService.viewAllPosts(departId, categoryId), HttpStatus.OK);
//	}
	
	@PostMapping("/write") // 게시글 쓰기
	public ResponseEntity<Long> createWriting(@RequestBody PostWriteReq postWriteReq) {
//		System.out.println(post);
//		postService.createWriting(postWriteReq);
//		System.out.println(post);
		return new ResponseEntity<Long>(postService.createWriting(postWriteReq), HttpStatus.OK);
	}
	
	@GetMapping("/read/{postId}/{userId}") // 게시글 상세 조회
	public ResponseEntity<PostViewOneRes> viewFindOne(@PathVariable Long postId, @PathVariable String userId) {
//		if(postService.viewFindOne(postId).getPostId() == postId) {
//			
//		}
//		Post test = new Post();
		System.out.println(postId);
		return new ResponseEntity<PostViewOneRes>(postService.viewFindOne(postId, userId), HttpStatus.OK);
//		return new ResponseEntity<Post>(test, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{postId}") // 단일 게시글 삭제
	public ResponseEntity<String> deleteFindOne(@PathVariable Long postId){
		System.out.println(postId);
		postService.deleteFindOne(postId);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/category/{categoryId}") // 카테고리 게시글 일괄 삭제
	public ResponseEntity<String> deleteAll(@PathVariable Long categoryId) {
		postService.deleteAllPosts(categoryId);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
	
	@PutMapping("/update") // 게시글 수정
    public ResponseEntity<LocalDateTime> editPost(@RequestBody PostUpdateReq editPostInfo){

        System.out.println("=====================");
        System.out.println("postContent : " + editPostInfo.getPostContent());
        System.out.println("=====================");

//        postService.editPost(editPostInfo);
        return new ResponseEntity<LocalDateTime>(postService.editPost(editPostInfo), HttpStatus.OK);
    }
	
	// 좋아요 기능 - 주희 추가
	// 좋아요 버튼 누름
	@GetMapping("/likeBtn/{postId}/{userId}")
	public ResponseEntity<Long> postLike(@PathVariable("postId") Long postId, @PathVariable("userId") String userId) {
		Long count = postService.postLike(postId, userId);
		return new ResponseEntity<Long>(count, HttpStatus.OK);
	}
	
}
