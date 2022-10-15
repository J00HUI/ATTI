package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.service.TestService;

@RestController
public class TestController {
	
	@Autowired
	private TestService testService;
	
	@PostMapping("/test/get")
	public void getRedisStringValue(String key) {
		testService.getRedisStringValue(key);
	}
	
	@PostMapping("/test/set")
	public void setRedisStringValue(String key, String value) {
		testService.setRedisStringValue(key, value);
	}
	
	
}
