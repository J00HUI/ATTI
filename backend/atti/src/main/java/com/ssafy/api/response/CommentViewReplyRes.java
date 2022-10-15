package com.ssafy.api.response;

import java.time.LocalDateTime;

import com.ssafy.db.entity.depart.Comment;

import lombok.Getter;

@Getter
public class CommentViewReplyRes {
	
	private Long commentId;
	
	private String commentContent;
	
	private LocalDateTime commentRegDate;
	
	private int commentGroup;
	
	private int commentLevel;
	
	private boolean seq;
	
	private String userId = "익명";
	
	private boolean myCommentLike;
	
	private long commentLikeCount;
	
	private String userName;
	
	public CommentViewReplyRes(Comment comment, boolean myCommentLike, long commentLikeCount, String userName) {
		this.commentId = comment.getCommentId();
		this.commentContent = comment.getCommentContent();
		this.commentRegDate = comment.getCommentRegDate();
		this.commentGroup = comment.getCommentGroup();
		this.commentLevel = comment.getCommentLevel();
		this.myCommentLike = myCommentLike;
		this.seq = comment.isSeq();
		if(comment.getUser() != null) {
			this.userId = comment.getUser().getUserId();
		}
		this.commentLikeCount = commentLikeCount;
		this.userName = userName;
	}
}