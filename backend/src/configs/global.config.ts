import { INestApplication } from "@nestjs/common";
import { HttpExceptionFilter } from "../filter/httpException.filter";
import { ValidationPipe } from "@nestjs/common";

export function setGlobal<T extends INestApplication>(app: T): void {
  app.setGlobalPrefix("/api");
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
