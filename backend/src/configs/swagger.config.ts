import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerOption = new DocumentBuilder()
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
