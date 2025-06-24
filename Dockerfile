# ------------ Build Stage ------------

# Use Maven + Java 17 image
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# Copy all project files
COPY . .

# Run Maven build (skip tests)
RUN mvn clean package -DskipTests

# ------------ Run Stage ------------

# Use lighter JDK image to run the app
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy jar file from build stage
COPY --from=build /app/target/*.jar app.jar

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
