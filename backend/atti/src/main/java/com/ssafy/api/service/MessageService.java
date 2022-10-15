package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.message.Message;

public interface MessageService {
	List<Message> viewAllMessage(Long userMessageId); // 메세지 전체 조회
	
	void sendMessage(Message message);
}
