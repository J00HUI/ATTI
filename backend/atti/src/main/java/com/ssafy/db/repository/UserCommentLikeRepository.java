package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Comment;
import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.depart.UserCommentLike;
import com.ssafy.db.entity.depart.UserPostLike;
import com.ssafy.db.entity.user.User;

@Repository
public interface UserCommentLikeRepository extends JpaRepository<UserCommentLike, Long>{
	public Optional<UserCommentLike> findByCommentAndUser(Comment comment, User user); 
	public long countByComment(Comment comment);
}
