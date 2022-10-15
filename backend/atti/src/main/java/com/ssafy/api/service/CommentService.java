package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.request.CommentWriteReq;
import com.ssafy.api.response.CommentViewReplyRes;
import com.ssafy.db.entity.depart.Comment;
import com.ssafy.db.entity.depart.Post;

public interface CommentService {
	List<CommentViewReplyRes> viewReply(Long postId, String userId); // 댓글 보기
	
	void createReply(CommentWriteReq commentWriteReq); // 댓글쓰기
	
	void deleteFindOne(Long commentId); // 댓글 삭제
	
	// 좋아요 - 주희
	long postCommentLike(Long commentId, String userId);
}
