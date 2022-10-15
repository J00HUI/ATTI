
//package com.ssafy.api.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.ssafy.db.entity.message.Message;
//import com.ssafy.db.repository.MessageRepository;
//
//@Service
//@Transactional
//public class MessageServiceImpl implements MessageService {
//
//	@Autowired
//	private MessageRepository messageRepository;
//	
//	@Override // 전체 메세지 조회
//	@Transactional(readOnly = true)
//	public List<Message> viewAllMessage(Long userMessageId) {
//		
//		return messageRepository.allMessage(MessageId);
//	}
//
//	@Override // 메세지 보내기
//	public void sendMessage(Message message) {
//		messageRepository.sendMessage(message);
//	}
//
//}

package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.db.entity.message.Message;
import com.ssafy.db.repository.MessageRepository;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;
	
	@Override // 전체 메세지 조회
	@Transactional(readOnly = true)
	public List<Message> viewAllMessage(Long messageId) {
		
		return messageRepository.allMessage(messageId);
	}

	@Override // 메세지 보내기
	public void sendMessage(Message message) {
		messageRepository.sendMessage(message);
	}

}

