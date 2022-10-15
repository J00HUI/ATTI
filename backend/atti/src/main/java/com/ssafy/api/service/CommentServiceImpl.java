package com.ssafy.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.request.CommentWriteReq;
import com.ssafy.api.response.CommentViewReplyRes;
import com.ssafy.db.entity.depart.Comment;
import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.depart.UserCommentLike;
import com.ssafy.db.entity.depart.UserPostLike;
import com.ssafy.db.entity.user.User;
import com.ssafy.db.repository.CommentRepository;
import com.ssafy.db.repository.PostRepository;
import com.ssafy.db.repository.UserCommentLikeRepository;
import com.ssafy.db.repository.UserRepository;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	// 좋아요 기능 - 주희
	@Autowired
	private UserCommentLikeRepository userCommentLikeRepository;
	
	@Override // 댓글 작성
	public void createReply(CommentWriteReq commentWriteReq) {
//		User user = userRepository.findById(comment.getUserId());
//		Post post = postRepository.findById(comment.getPostId());
		
//		Comment entity = comment.toEntity(user, post);
//		commentRepository.insertWriting(comment);
		commentWriteReq.setCommentRegDate(LocalDateTime.now());
		
		Post post = postRepository.findById(commentWriteReq.getPostId()).orElse(null);
		User user = userRepository.findById(commentWriteReq.getUserId()).orElse(null);
		
		Comment comment = Comment.builder()
				.commentAnoInfo(commentWriteReq.isCommentAnoInfo())
				.commentContent(commentWriteReq.getCommentContent())
				.commentDeleteInfo(commentWriteReq.isCommentDeleteInfo())
				.commentRegDate(commentWriteReq.getCommentRegDate())
				.commentGroup(commentWriteReq.getCommentGroup())
				.commentLevel(commentWriteReq.getCommentLevel())
				.seq(commentWriteReq.isSeq())
				.user(user)
				.post(post)
				.build();
		
		commentRepository.save(comment);
	}

	@Override // 단일 댓글 삭제
	public void deleteFindOne(Long commentId) {
		commentRepository.deleteById(commentId);
	}

	@Override // 댓글 조회
	@Transactional(readOnly = true)
	public List<CommentViewReplyRes> viewReply(Long postId, String userId) {
//		return commentRepository.findComment(postId);
		Post post = postRepository.findById(postId).orElse(null);
		List<Comment> commentList = commentRepository.findByPostOrderByCommentId(post);
		
		List<CommentViewReplyRes> commentViewReplyRes;
		if(commentList.isEmpty()) return null;
		else commentViewReplyRes = new ArrayList<CommentViewReplyRes>();
		
		User user = userRepository.findById(userId).orElse(null);
		for(Comment c : commentList) {
			if(c.isCommentAnoInfo() == true) {
				c.setUser(null);
			}
			UserCommentLike ucl = userCommentLikeRepository.findByCommentAndUser(c, user).orElse(null);
			boolean myCommentLike = false;
			if(ucl != null)
				myCommentLike = true;
			long commentLikeCount = userCommentLikeRepository.countByComment(c);
			
			commentViewReplyRes.add(new CommentViewReplyRes(c, myCommentLike, commentLikeCount, c.getUser().getUserName()));
		}
		return commentViewReplyRes;
	}
	
	// 좋아요 기능 - 주희
	@Override
	@Transactional
	public long postCommentLike(Long commentId, String userId) {
		Comment comment = commentRepository.findById(commentId).orElse(null);
		User user = userRepository.findById(userId).orElse(null);
		
		// UserCommentLike 에서 comment 에 해당하는 user 가 있는지 찾기
		UserCommentLike userCommentLike = userCommentLikeRepository.findByCommentAndUser(comment, user).orElse(null);
		
		// 없다면, 추가
		if(userCommentLike == null)
			userCommentLikeRepository.save(new UserCommentLike().builder().comment(comment).user(user).build());
		// 있다면, 삭제
		else userCommentLikeRepository.deleteById(userCommentLike.getUserCommentLikeId());
		
		// 변화된 갯수 리턴
		long count = userCommentLikeRepository.countByComment(comment);
		return count;
	}
}
