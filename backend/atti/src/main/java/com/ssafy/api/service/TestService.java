package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@Service
public class TestService {
	@Autowired
	private StringRedisTemplate stringRedisTemplate;
	
	public void getRedisStringValue(String key) {
		ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
		System.out.println("Redis Key : " + key);
		System.out.println("Redis Value : " + stringValueOperations.get(key));
	}
	
	public void setRedisStringValue(String key, String value) {
		ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
		stringValueOperations.set(key, value);
		System.out.println("Saved : RedisKey : " + key);
		System.out.println("Saved : RedisValue : " + stringValueOperations.get(key));
	}
}
