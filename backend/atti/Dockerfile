# java 8 위에서 스프링 부트 앱이 실행
FROM java:8

# /tmp 아래에 이 컨테이너가 필요한 여러가지 데이터를 저장
VOLUME /tmp

# 도커 노출 포트
EXPOSE 8080

# 어떤 어플리케이션을 실행하는지 실행파일을 연결
# gradle build를 통해 생성한 .jar 파일의 위치
# 경로 확인이 중요
# 상대 경로로 적어서 다른 팀원의 개발환경에 적용
ARG JAR_FILE=build/libs/atti-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

# 어플리케이션 실행 명령어 : java 실행 명령어
ENTRYPOINT ["java","-jar","/app.jar"]

ARG DEBIAN_FRONTEND=noninteractive

ENV TZ=Asia/Seoul

RUN apt-get install -y tzdata