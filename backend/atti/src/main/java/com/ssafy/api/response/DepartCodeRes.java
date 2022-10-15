package com.ssafy.api.response;

import com.ssafy.db.entity.depart.Depart;

import lombok.Getter;

@Getter
public class DepartCodeRes {
	private String departCode;
	
	public DepartCodeRes(Depart depart) {
		this.departCode = depart.getDepartCode();
	}
}
