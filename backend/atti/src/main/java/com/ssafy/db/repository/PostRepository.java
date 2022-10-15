package com.ssafy.db.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.Post;
import com.ssafy.db.entity.user.User;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
	List<Post> findByDepartAndCategoryOrderByPostIdDesc(Depart depart, Category category);

	Optional<Post> deleteByCategory(Category category);
	
	List<Post> findByCategory(Category category);
	
	void findByPostRegDate(Post post);
	
//	Optional<Post> findByPost(Post post);
}
