# Build stage
FROM maven:3.8-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies separately (for better caching)
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn package -DskipTests

# Runtime stage (multi-stage build for smaller final image)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Document required environment variables
# ENV MYSQL_HOST=localhost
# ENV MYSQL_PORT=3306
# ENV MYSQL_DATABASE=rastreamento-de-gastos
# ENV MYSQL_USERNAME=root
# ENV MYSQL_PASSWORD=password

# Set entrypoint
ENTRYPOINT ["java", "-jar", "app.jar"]