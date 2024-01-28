import { Service } from "typedi";
import "reflect-metadata";
import { AppDataSource } from "../ormconfig";
import { Post } from "../entities/posts";
import { Tags } from "../entities/tags";
import { PostTag } from "../entities/postTag";

@Service()
export class PostService {
  async listPostService(page: number, search: string, sortDate: string) {
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;
    const sortOrder = sortDate === "1" ? "DESC" : "ASC";

    const repoPostTag = AppDataSource.getRepository(Post);

    // Fetch posts without tags first
    const repsPost = await repoPostTag
      .createQueryBuilder("p")
      .select("p.id", "postId")
      .addSelect("p.title", "title")
      .addSelect("p.content", "content")
      .addSelect("p.posted_at", "postedAt")
      .addSelect("p.posted_by", "postedBy")
      .skip(offset)
      .take(itemsPerPage)
      .orderBy("p.posted_at", sortOrder)
      .getRawMany();

    // Fetch tags with search condition
    const repsTags = await repoPostTag
      .createQueryBuilder("p")
      .select("p.id", "postId")
      .addSelect("p.title", "title")
      .addSelect("p.content", "content")
      .addSelect("p.posted_at", "postedAt")
      .addSelect("p.posted_by", "postedBy")
      .addSelect("t.name", "tagName")
      .addSelect("pt.tagsId", "tagsId")
      .from(PostTag, "pt")
      .addFrom(Tags, "t")
      .where("p.id = pt.postId")
      .andWhere("pt.tagsId = t.id")
      .andWhere(`t.name like '%${search}%'`)
      .skip(offset)
      .take(itemsPerPage)
      .orderBy("p.posted_at", sortOrder)
      .getRawMany();

    if (search === 'null') {
      // no search
      const filterDataPost = repsPost.map((post) => {
        let tags: { id: string; name: string }[] = [];

        const correspondingTags = repsTags.filter(
          (tag) => tag.postId === post.postId
        );

        if (correspondingTags.length > 0) {
          tags = correspondingTags.map((tag) => ({
            id: tag.tagsId,
            name: tag.tagName,
          }));
        }

        return {
          ...post,
          tags: tags,
        };
      });

      return filterDataPost;
    }

    // Search tags
    const filterDataTags = repsTags.map((tagsParent) => {
      let tags: { id: string; name: string }[] = [];

      const correspondingTags = repsTags.filter(
        (tag) => tag.postId === tagsParent.postId
      );

      if (correspondingTags.length > 0) {
        tags = correspondingTags.map((tag) => ({
          id: tag.tagsId,
          name: tag.tagName,
        }));
      }

      return {
        ...tagsParent,
        tags: tags,
      };
    });

    return filterDataTags;
  }
}
