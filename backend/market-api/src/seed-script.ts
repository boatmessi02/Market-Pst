import "reflect-metadata";
import { AppDataSource } from "./ormconfig";
import { Post } from "./entities/posts";
import { readFile } from "fs/promises";
import { Tags } from "./entities/tags";
import { PostTag } from "./entities/postTag";

export const seedPost = async () => {
    const jsonFilePath = process.env.JSON_FILE || "./src/posts.json";
    const jsonData = await readFile(jsonFilePath, "utf-8");
    const postsData = JSON.parse(jsonData);
    const postRepository = AppDataSource.getRepository(Post);
    const tagsRepository = AppDataSource.getRepository(Tags);
    const postTagsRepository = AppDataSource.getRepository(PostTag);
    for (const postData of postsData) {
      // Create or update Post entity
      const post = await postRepository.save(
        postRepository.create({
          title: postData.title,
          content: postData.content,
          posted_at: postData.postedAt,
          posted_by: postData.postedBy,
        })
      );

      if (postData.tags && postData.tags.length > 0) {
        for (const tagName of postData.tags) {
          // Create or update Tag entity
          const tag = await tagsRepository.save(
            tagsRepository.create({ name: tagName })
          );

          // Create PostTags entity
          const postTag = postTagsRepository.create({
            postId: post.id, 
            tagsId: tag.id,
          });

          await postTagsRepository.save(postTag);
        }
      }
    }

    return { success: "Data seeded successfully" };
  }