import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filter/httpException.filter";

const options = {
  origin: process.env.FRONT_LOCALHOST,
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.NODE_ENV === "dev" && app.enableCors(options);
  app.use(cookieParser());
  app.setGlobalPrefix("/api");
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("JustUs")
    .setDescription("The JustUs API Document")
    .setVersion("0.0.1")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "Token",
      },
      "accessToken",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(5000);
}
bootstrap();
