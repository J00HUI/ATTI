package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.CommentWriteReq;
import com.ssafy.api.response.CommentViewReplyRes;
import com.ssafy.api.service.CommentService;
import com.ssafy.db.entity.depart.Comment;
import com.ssafy.db.entity.depart.Post;

@RestController
@RequestMapping("/post/comment")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@PostMapping("/write") // 댓글 작성
	public ResponseEntity<String> createReply(@RequestBody CommentWriteReq commentWriteReq) {
//		System.out.println(commentWriteReq);
		commentService.createReply(commentWriteReq);
		
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{commentId}") // 단일 댓글 삭제
	public ResponseEntity<String> deleteFindOne(@PathVariable Long commentId) {
		commentService.deleteFindOne(commentId);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
	
	@GetMapping("/read/{postId}/{userId}") // 한 게시글의 댓글 보기
	public ResponseEntity<List<CommentViewReplyRes>> viewReply(@PathVariable Long postId, @PathVariable("userId") String userId){
//		commentService.viewReply(postId);
		return new ResponseEntity<List<CommentViewReplyRes>>(commentService.viewReply(postId, userId), HttpStatus.OK);
	}
	
	// 댓글 좋아요 기능 - 주희
	@GetMapping("/likeBtn/{commentId}/{userId}")
	public ResponseEntity<Long> postCommentLike(@PathVariable("commentId") Long commentId, @PathVariable("userId") String userId) {
		Long count = commentService.postCommentLike(commentId, userId);
		return new ResponseEntity<Long>(count, HttpStatus.OK);
	} 
}
