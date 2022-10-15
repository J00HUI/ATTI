package com.ssafy.db.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.db.entity.depart.Category;

@Repository
@Transactional
public class CategoryRepository2 {
	
	@PersistenceContext
	private EntityManager em;
	
	// 카테고리 Id 찾기
	public Category findById(Long categoryId) {
		
		return em.createQuery("select c from Category c where c.categoryId = :categoryId", Category.class)
				.setParameter("categoryId", categoryId)
				.getSingleResult();
	}
}
