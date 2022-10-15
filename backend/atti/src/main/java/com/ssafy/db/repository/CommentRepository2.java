package com.ssafy.db.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.request.CommentWriteReq;
import com.ssafy.db.entity.depart.Comment;
import com.ssafy.db.entity.depart.Post;

@Repository
@Transactional
public class CommentRepository2 {
	
	@PersistenceContext
	private EntityManager em;
	
	// 댓글 조회(맞나...?)
	public List<Comment> findComment(Post postId) {
		System.out.println("================" + postId + "=================");
//		List<Comment> result = em.createQuery("select c from Comment as c join Post as p on c.post = p.postId where c.post = :postId", Comment.class)
//				.setParameter("postId", postId)
//				.getResultList();
		List<Comment> result = em.createQuery("select c from Comment c where c.post = :postId", Comment.class)
				.setParameter("postId", postId)
				.getResultList();
		return result;
		
	}
	
	// 댓글 작성
	public void insertWriting(CommentWriteReq comment) {
		em.persist(comment);
		
	}
	
	// 단일 댓글 삭제
	public void deleteOne(Long commentId) {
		Comment result = em.createQuery("select c from Comment as c where c.commentId = :commentId", Comment.class)
				.setParameter("commentId", commentId)
				.getSingleResult();
		em.remove(result);
	}
	
}
