import { NestFactory } from "@nestjs/core";
import { setGlobal, corsOptions, swaggerOption } from "./configs";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.NODE_ENV === "dev" && app.enableCors(corsOptions);

  app.use(cookieParser());

  setGlobal(app);

  const document = SwaggerModule.createDocument(app, swaggerOption);
  SwaggerModule.setup("api", app, document);

  await app.listen(5001);
}
bootstrap();
