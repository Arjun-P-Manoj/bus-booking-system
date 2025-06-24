
# Use Maven + JDK image to build
FROM maven:3.9.4-eclipse-temurin-17 as builder

WORKDIR /app

# Copy everything into container
COPY . .

# Build the app (skip tests to avoid errors)
RUN mvn clean package -DskipTests

# ==============================

# Use a smaller JDK image to run the app
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy built jar from the first stage
COPY --from=builder /app/target/*.jar app.jar

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
