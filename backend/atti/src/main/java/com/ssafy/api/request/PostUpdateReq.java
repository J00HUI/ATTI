package com.ssafy.api.request;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.depart.Category;
import com.ssafy.db.entity.depart.Comment;
import com.ssafy.db.entity.depart.File;
import com.ssafy.db.entity.depart.Image;
import com.ssafy.db.entity.depart.UserPostLike;
import com.ssafy.db.entity.depart.UserPostMention;
import com.ssafy.db.entity.user.User;

import lombok.*;

@Getter
@Setter
public class PostUpdateReq {

    private Long postId;

    private String postTitle;

    private String postContent;

    private LocalDateTime postRegDate;

//    private LocalDateTime postUpdDate;

    private boolean postAnoInfo;

    private boolean postComBanInfo;
    
    private Long departId;
    
    private Long categoryId;
    
    private String userId;

}