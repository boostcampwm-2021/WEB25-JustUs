export interface CustomRequest extends Request {
  user: { accessToken: string; refreshToken: string; userId: number };
}
