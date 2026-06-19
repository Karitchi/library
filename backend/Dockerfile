FROM maven:4-eclipse-temurin-25 AS builder
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline -DskipTests
COPY src src
RUN mvn package -DskipTests

FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
