import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class NaverFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const redirectUrl = process.env.NODE_ENV === "dev" ? process.env.DEV_REDIRECT_URL : process.env.PROD_REDIRECT_URL;

    response.status(status).redirect(`${redirectUrl}login`);
  }
}
