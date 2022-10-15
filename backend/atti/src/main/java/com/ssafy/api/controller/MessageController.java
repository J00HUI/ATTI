package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.service.MessageService;
import com.ssafy.db.entity.message.Message;
import com.ssafy.db.repository.MessageRepository;

@RestController
@RequestMapping("/message/individual")
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	@GetMapping("/read/{userMessageId}") // 특정 메세지 조회
	public ResponseEntity<List<Message>> viewAllMessage(@PathVariable Long messageId) {
		System.out.println(messageId);
		return new ResponseEntity<List<Message>>(messageService.viewAllMessage(messageId), HttpStatus.OK);
	}
	
	@PostMapping("/send") // 메세지 보내기
	public ResponseEntity<String> sendMessage(@RequestBody Message message) {
		messageService.sendMessage(message);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
}
