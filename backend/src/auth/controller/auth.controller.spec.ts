import { Test, TestingModule } from "@nestjs/testing";
import { OauthController } from "./auth.controller";

describe("OauthController", () => {
  let controller: OauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OauthController],
    }).compile();

    controller = module.get<OauthController>(OauthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
