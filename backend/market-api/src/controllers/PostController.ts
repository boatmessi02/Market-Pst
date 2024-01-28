/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostService } from "../services/PostService";
import { Inject, Service } from "typedi";
import { Get, JsonController, Params, Res } from "routing-controllers";
import { Response } from "express";
import { Post } from "../interfaces/post";
import { ResponseSchema } from "routing-controllers-openapi";

@Service()
@JsonController("/posts")
export class PostController {
  @Inject(() => PostService)
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  @ResponseSchema(Post)
  @Get("/:page/:search/:sortDate")
  async getListPost(
    @Res() res: Response,
    @Params() params: { page: number; search: string; sortDate: string }
  ) {
    try {
      const resp = await this.postService.listPostService(
        params.page,
        params.search,
        params.sortDate
      );

      return res.status(200).json(resp);
    } catch (error) {
      console.error("Error while fetching posts:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch posts. See server logs for details." });
    }
  }
}
