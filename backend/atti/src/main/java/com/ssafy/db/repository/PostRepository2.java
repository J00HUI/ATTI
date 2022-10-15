package com.ssafy.db.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Depart;
import com.ssafy.db.entity.depart.Post;

@Repository
@Transactional
public class PostRepository2 {
	
	@PersistenceContext
	private EntityManager em;
	
	// 글쓰기
	public void insertWriting(Post post) {
		em.persist(post);
	}
	
	// 게시글 전체 조회
	public List<Post> findAllPosts(Depart departId, Category categoryId) {
		List<Post> result = em.createQuery("select p from Post as p where p.depart = :departId and p.category = :categoryId order by p.postId desc", Post.class)
				.setParameter("departId", departId)
				.setParameter("categoryId", categoryId)
				.getResultList();
		return result;
	}
	
	// 게시글 전체 삭제 (필요없음)
//	public void deleteAll(Post post) {
//		em.remove(post);
//	}
	
	// 단일 게시글 삭제
	public void deleteOne(Long postId) {
		//delete
//		Customer firstCustomer = jpaRepository.findCustomerById(1);
//		jpaRepository.delete(firstCustomer);
		Post result = em.createQuery("select p from Post as p where p.postId = :postId", Post.class)
				.setParameter("postId", postId)
				.getSingleResult();
		em.remove(result);
		
		
//		em.createQuery("delete p from Post as p where p.postId = :postId");
	}
	
	// 게시글 전체 삭제
	public void deleteAll() {
//		em.createQuery("delete p from Post as p", Post.class).getResultList();
		List<Post> result = em.createQuery("select p from Post as p", Post.class).getResultList();
		for(int i = 0; i < result.size(); i++) {
			em.persist(result.get(i));
			em.remove(result.get(i));
		}
	}
	
	// 단일 게시글 상세 보기
	public Post findOne(Long postId) {
		Post result = em.createQuery("select p from Post as p where p.postId = :postId", Post.class)
				.setParameter("postId", postId)
				.getSingleResult();
		return result;
	}
	
	
	// 이름으로 게시글 검색 / 조회
	public List<Post> findByName(String name) {
		return em.createQuery("select p from Post as p where p.user_id = :name", Post.class)
				.setParameter("name", name)
				.getResultList();
	}
	
	// 단일 게시글 수정
    public void updateOne(Post editPost) {

        System.out.println("============Repository================");
        System.out.println("postId : " + editPost.getPostId());
        System.out.println("======================================");

//        em.persist(editPost.getUser());

        Post originPost = em.createQuery("select p from Post as p where p.postId = :postId", Post.class)
                .setParameter("postId", editPost.getPostId())
                .getSingleResult();


        originPost.setPostTitle(editPost.getPostTitle());
        originPost.setUser(editPost.getUser());
        originPost.setPostContent(editPost.getPostContent());
        originPost.setPostUpdDate(editPost.getPostUpdDate());
    }
	
	
}
