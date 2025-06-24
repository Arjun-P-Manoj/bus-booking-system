# ----------- Build Stage -----------
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy all project files
COPY . .

# Build the Spring Boot app
RUN mvn clean package -DskipTests

# ----------- Run Stage -----------
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
# ----------- Build Stage -----------
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy all project files
COPY . .

# Build the Spring Boot app
RUN mvn clean package -DskipTests

# ----------- Run Stage -----------
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy built jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
