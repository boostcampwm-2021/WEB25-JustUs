import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const options = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(options);

  app.use(cookieParser());

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
