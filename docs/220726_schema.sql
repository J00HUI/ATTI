create database atti_db_test2;
use atti_db_test2;
-- create database atti_db;
-- use atti_db;

DROP TABLE IF EXISTS USER_POST_LIKE;
DROP TABLE IF EXISTS USER_POST_MENTION;
DROP TABLE IF EXISTS USER_depart;
DROP TABLE IF EXISTS depart_TAG_LIST;
DROP TABLE IF EXISTS USER_COMMENT_LIKE;
DROP TABLE IF EXISTS USER_COMMENT_MENTION;
DROP TABLE IF EXISTS COMMENT;
DROP TABLE IF EXISTS IMAGE;
DROP TABLE IF EXISTS FILE;
DROP TABLE IF EXISTS ATTENDANCE;
DROP TABLE IF EXISTS CHAT;
DROP TABLE IF EXISTS CHAT_CATEGORY;
DROP TABLE IF EXISTS CHATROOM;
DROP TABLE IF EXISTS departcourse;
DROP TABLE IF EXISTS POST;
DROP TABLE IF EXISTS CATEGORY;
DROP TABLE IF EXISTS depart_TAG;
DROP TABLE IF EXISTS depart;
DROP TABLE IF EXISTS MESSAGE;
DROP TABLE IF EXISTS USER_MESSAGE;
DROP TABLE IF EXISTS PROFILE;
DROP TABLE IF EXISTS AUTH;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS USER;

CREATE TABLE USER
(
   user_id               VARCHAR(100) NOT NULL ,
   user_name             VARCHAR(20)  NOT NULL ,
   uid                   VARCHAR(100) NOT NULL ,
   birth                 VARCHAR(20)  NOT NULL ,
   email                 VARCHAR(30)  NOT NULL ,
   phone                 VARCHAR(20)  NOT NULL ,
   social                VARCHAR(10)  NULL ,
   user_delete_info           TINYINT  NULL ,
   user_role             VARCHAR(12)  NOT NULL ,
   CONSTRAINT USER PRIMARY KEY(user_id)
);


CREATE TABLE course
(
   course_id              VARCHAR(100)  NOT NULL ,
   course_start_time      DATETIME  NOT NULL ,
   course_end_time        DATETIME  NOT NULL ,
   course_date            DATE  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT course PRIMARY KEY(course_id, user_id),
   FOREIGN KEY (user_id) REFERENCES USER (user_id)
);

CREATE TABLE AUTH
(
   auth_id               VARCHAR(100)  NOT NULL ,
   login_id              VARCHAR(30)  NOT NULL ,
   pwd              VARCHAR(30)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT AUTH PRIMARY KEY(auth_id, user_id),
   FOREIGN KEY (user_id)REFERENCES USER(user_id)
);

CREATE TABLE PROFILE
(
   profile_id            VARCHAR(100)  NOT NULL ,
   profile_origin        VARCHAR(100)  NOT NULL ,
   profile_new           VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   profile_folder        VARCHAR(100)  NULL,
   CONSTRAINT PROFILE PRIMARY KEY(profile_id, user_id),
   FOREIGN KEY (user_id)REFERENCES USER(user_id)
);

CREATE TABLE USER_MESSAGE
(
   user_message_id       VARCHAR(100)  NOT NULL ,
   read_info             TINYINT  NULL ,
   send_date             DATE  NOT NULL ,
   to_user_id               VARCHAR(100)  NOT NULL ,
   from_user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT USER_MESSAGE PRIMARY KEY(user_message_id, to_user_id, from_user_id),
   FOREIGN KEY (to_user_id) REFERENCES USER(user_id),
   FOREIGN KEY (from_user_id) REFERENCES USER(user_id)
);

CREATE TABLE MESSAGE
(
   message_id            VARCHAR(100)  NOT NULL ,
   message_title         VARCHAR(20)  NOT NULL ,
   message_content       VARCHAR(100)  NOT NULL ,
   user_message_id       VARCHAR(100)  NOT NULL ,
   to_user_id               VARCHAR(100)  NOT NULL ,
   from_user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT MESSAGE PRIMARY KEY(message_id, to_user_id, from_user_id, user_message_id) ,
   FOREIGN KEY (to_user_id) REFERENCES USER_MESSAGE(to_user_id) ,
   FOREIGN KEY (from_user_id) REFERENCES USER_MESSAGE(from_user_id),
   FOREIGN KEY (user_message_id) REFERENCES USER_MESSAGE (user_message_id)
);

CREATE TABLE depart
(
   depart_id            VARCHAR(100)  NOT NULL ,
   depart_name          VARCHAR(20)  NOT NULL ,
   depart_code          VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT depart PRIMARY KEY(depart_id, user_id),
   FOREIGN KEY (user_id) REFERENCES USER (user_id)
);

CREATE TABLE depart_TAG
(
   depart_tag_id        VARCHAR(100)  NOT NULL PRIMARY KEY ,
   depart_tag_name      VARCHAR(25)  NOT NULL 
);

CREATE TABLE CATEGORY
(
   category_id           VARCHAR(100)  NOT NULL ,
   category_name         VARCHAR(30)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   ctype                 VARCHAR(6)  NOT NULL ,
   category_ano_info     TINYINT  NOT NULL ,
   category_com_info     TINYINT  NOT NULL ,
   category_com_ano_info TINYINT  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT CATEGORY PRIMARY KEY(category_id, depart_id, user_id),
   FOREIGN KEY (depart_id) REFERENCES depart (depart_id),
   FOREIGN KEY (user_id) REFERENCES USER (user_id)
);

CREATE TABLE POST
(
   post_id               VARCHAR(100)  NOT NULL ,
   post_title            VARCHAR(100)  NOT NULL ,
   category_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   post_content          TEXT  NOT NULL ,
   post_reg_date         DATE  NOT NULL ,
   post_upd_date         DATE  NOT NULL ,
   post_ano_info         TINYINT  NOT NULL ,
   post_com_ban_info     TINYINT  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT POST PRIMARY KEY(post_id, user_id, category_id, depart_id),
   FOREIGN KEY (user_id) REFERENCES USER (user_id),
   FOREIGN KEY (category_id) REFERENCES CATEGORY (category_id),
   FOREIGN KEY (depart_id) REFERENCES CATEGORY (depart_id)
);



CREATE TABLE departcourse
(
   departcourse_id           VARCHAR(100)  NOT NULL ,
   departcourse_start_time   DATETIME  NOT NULL ,
   departcourse_end_time     DATETIME  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   course_id              VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT departcourse PRIMARY KEY(departcourse_id, depart_id, user_id, course_id),
   FOREIGN KEY (depart_id) REFERENCES depart (depart_id),
   FOREIGN KEY (user_id) REFERENCES course (user_id),
   FOREIGN KEY (course_id) REFERENCES course (course_id)
);

CREATE TABLE CHATROOM
(
   chatroom_id           VARCHAR(100)  NOT NULL ,
   departcourse_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   course_id              VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT CHATROOM PRIMARY KEY(chatroom_id, departcourse_id, depart_id, course_id, user_id),
   FOREIGN KEY (departcourse_id) REFERENCES departcourse (departcourse_id),
   FOREIGN KEY (depart_id) REFERENCES departcourse (depart_id),
   FOREIGN KEY (course_id) REFERENCES departcourse (course_id),
   FOREIGN KEY (user_id) REFERENCES departcourse (user_id)
);

CREATE TABLE CHAT_CATEGORY
(
   chat_category_id      VARCHAR(100)  NOT NULL PRIMARY KEY ,
   chat_category_name    VARCHAR(20)  NOT NULL 
);

CREATE TABLE CHAT
(
   chatroom_id           VARCHAR(100)  NOT NULL ,
   writre_date           DATE  NOT NULL ,
   chat_category_id      VARCHAR(100)  NOT NULL ,
   departcourse_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   course_id              VARCHAR(100)  NOT NULL ,
   chat_id               VARCHAR(100)  NOT NULL ,
   answer_info           TINYINT  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   chat_content          TEXT  NOT NULL ,
   CONSTRAINT CHAT PRIMARY KEY(chat_id, chatroom_id, departcourse_id, depart_id, user_id, course_id, chat_category_id),
   FOREIGN KEY (chatroom_id) REFERENCES CHATROOM (chatroom_id),
   FOREIGN KEY (departcourse_id) REFERENCES CHATROOM (departcourse_id),
   FOREIGN KEY (depart_id) REFERENCES CHATROOM (depart_id),
   FOREIGN KEY (user_id) REFERENCES CHATROOM (user_id),
   FOREIGN KEY (course_id) REFERENCES CHATROOM (course_id),
   FOREIGN KEY (chat_category_id) REFERENCES CHAT_CATEGORY (chat_category_id)
);


CREATE TABLE ATTENDANCE
(
   departcourse_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   course_id              VARCHAR(100)  NOT NULL ,
   attendance_content    VARCHAR(20)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   attendance_id         VARCHAR(100)  NOT NULL ,
   CONSTRAINT ATTENDANCE PRIMARY KEY(attendance_id, departcourse_id, depart_id, user_id, course_id),
   FOREIGN KEY (departcourse_id) REFERENCES departcourse (departcourse_id) ,
   FOREIGN KEY (depart_id) REFERENCES departcourse (depart_id) ,
   FOREIGN KEY (user_id) REFERENCES USER (user_id) ,
   FOREIGN KEY (course_id) REFERENCES departcourse (course_id)
);

CREATE TABLE FILE
(
   file_id              VARCHAR(100)  NOT NULL ,
   post_id              VARCHAR(100)  NOT NULL ,
   category_id          VARCHAR(100)  NOT NULL ,
   depart_id           VARCHAR(100)  NOT NULL ,
   user_id              VARCHAR(100)  NOT NULL ,
   file_origin          VARCHAR(100)  NOT NULL ,
   file_new             VARCHAR(100)  NOT NULL ,
   file_folder          VARCHAR(100)  NOT NULL ,
   CONSTRAINT FILE PRIMARY KEY(file_id, post_id, category_id, depart_id, user_id) ,
   FOREIGN KEY (post_id) REFERENCES POST (post_id) ,
   FOREIGN KEY (category_id) REFERENCES POST (category_id) ,
   FOREIGN KEY (depart_id) REFERENCES POST (depart_id) ,
   FOREIGN KEY (user_id) REFERENCES POST (user_id)
);


CREATE TABLE IMAGE
(
   image_id              VARCHAR(100)  NOT NULL ,
   image_origin          VARCHAR(100)  NOT NULL ,
   post_id               VARCHAR(100)  NOT NULL ,
   category_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   image_new             VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   image_folder          VARCHAR(100)  NULL ,
   CONSTRAINT IMAGE PRIMARY KEY(image_id, post_id, category_id, depart_id, user_id ) ,
   FOREIGN KEY (post_id) REFERENCES POST (post_id) ,
   FOREIGN KEY (category_id) REFERENCES POST (category_id) ,
   FOREIGN KEY (depart_id) REFERENCES POST (depart_id) ,
   FOREIGN KEY (user_id) REFERENCES POST (user_id) 
);

CREATE TABLE COMMENT
(
   comment_id            VARCHAR(100)  NOT NULL ,
   comment_reg_date      DATE  NOT NULL ,
   post_id               VARCHAR(100)  NOT NULL ,
   category_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   comment_delete_info   TINYINT  NOT NULL ,
   comment_ano_info      TINYINT  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   comment_content       TEXT  NOT NULL ,
   comment_group         INT  NOT NULL ,
   comment_level                 INT  NULL ,
   seq                   TINYINT  NOT NULL ,
   CONSTRAINT COMMENT PRIMARY KEY(comment_id, post_id, category_id, depart_id, user_id ) ,
   FOREIGN KEY (post_id) REFERENCES POST (post_id) ,
   FOREIGN KEY (category_id) REFERENCES POST (category_id) ,
   FOREIGN KEY (depart_id) REFERENCES POST (depart_id) ,
   FOREIGN KEY (user_id) REFERENCES USER (user_id) 
);

CREATE TABLE USER_COMMENT_MENTION
(
   comment_id            VARCHAR(100)  NOT NULL ,
   post_id               VARCHAR(100)  NOT NULL ,
   category_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT USER_COMMENT_MENTION PRIMARY KEY(comment_id, post_id, category_id, depart_id, user_id ) ,
   FOREIGN KEY (comment_id) REFERENCES COMMENT (comment_id) ,
   FOREIGN KEY (post_id) REFERENCES COMMENT (post_id) ,
   FOREIGN KEY (category_id) REFERENCES COMMENT (category_id) ,
   FOREIGN KEY (depart_id) REFERENCES COMMENT (depart_id) ,
   FOREIGN KEY (user_id) REFERENCES USER (user_id) 
);

CREATE TABLE USER_COMMENT_LIKE
(
   comment_id            VARCHAR(100)  NOT NULL ,
   post_id               VARCHAR(100)  NOT NULL ,
   category_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT USER_COMMENT_LIKE PRIMARY KEY(comment_id, post_id, category_id, depart_id, user_id ) ,
   FOREIGN KEY (comment_id) REFERENCES COMMENT (comment_id) ,
   FOREIGN KEY (post_id) REFERENCES COMMENT (post_id) ,
   FOREIGN KEY (category_id) REFERENCES COMMENT (category_id) ,
   FOREIGN KEY (depart_id) REFERENCES COMMENT (depart_id) ,
   FOREIGN KEY (user_id) REFERENCES USER (user_id) 
);



CREATE TABLE depart_TAG_LIST
(
   depart_tag_id            VARCHAR(100)  NOT NULL ,
   depart_id               VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT depart_TAG_LIST PRIMARY KEY(depart_tag_id, depart_id, user_id) ,
   FOREIGN KEY (depart_tag_id) REFERENCES depart_TAG (depart_tag_id) ,
   FOREIGN KEY (depart_id) REFERENCES depart(depart_id) ,
   FOREIGN KEY (user_id) REFERENCES depart (user_id)
);

CREATE TABLE USER_depart
(
   depart_id               VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT USER_depart PRIMARY KEY(depart_id, user_id) ,
   FOREIGN KEY (depart_id) REFERENCES depart (depart_id) ,
   FOREIGN KEY (user_id) REFERENCES USER (user_id)
);

CREATE TABLE USER_POST_MENTION
(
   post_id               VARCHAR(100)  NOT NULL ,
   category_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT USER_POST_MENTION PRIMARY KEY(post_id, category_id, depart_id, user_id),
   FOREIGN KEY (post_id) REFERENCES POST (post_id),
   FOREIGN KEY (category_id) REFERENCES POST (category_id),
   FOREIGN KEY (depart_id) REFERENCES POST (depart_id),
   FOREIGN KEY (user_id) REFERENCES USER (user_id)
);

CREATE TABLE USER_POST_LIKE
(
   post_id               VARCHAR(100)  NOT NULL ,
   category_id           VARCHAR(100)  NOT NULL ,
   depart_id            VARCHAR(100)  NOT NULL ,
   user_id               VARCHAR(100)  NOT NULL ,
   CONSTRAINT USER_POST_MENTION PRIMARY KEY(post_id, category_id, depart_id, user_id),
   FOREIGN KEY (post_id) REFERENCES POST (post_id),
   FOREIGN KEY (category_id) REFERENCES POST (category_id),
   FOREIGN KEY (depart_id) REFERENCES POST (depart_id),
   FOREIGN KEY (user_id) REFERENCES USER (user_id)
);