FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

RUN apk add --no-cache bash

EXPOSE 8080

CMD ["./gradlew", "bootRun", "--no-daemon"]