package com.ssafy.db.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.message.Message;

@Repository
@Transactional
public class MessageRepository {
	
	@PersistenceContext
	private EntityManager em;
	
	// 쪽지 보내기
	public void sendMessage(Message message) {
		em.persist(message);
	}
	
	// 쪽지 전체 조회
	public List<Message> allMessage(Long messageId) {
		List<Message> messageBox = em.createQuery("select m from Message as m where m.messageId = :messageId", Message.class)
				.setParameter("messageId", messageId)
				.getResultList();
		return messageBox;
	}
}
