package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.depart.UserPostLike;
import com.ssafy.db.entity.user.User;

@Repository
public interface UserPostLikeRepository extends JpaRepository<UserPostLike, Long>{
	public Optional<UserPostLike> findByPostAndUser(Post post, User user); 
	public long countByPost(Post post);
}
