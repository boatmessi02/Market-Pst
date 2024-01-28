// post.entity.ts
import { Entity, Column } from 'typeorm';

@Entity({schema: 'marketdb'})
export class PostTag {
  @Column({ primary: true,type:'uuid',generated:'uuid'})
  postId!: string;

  @Column({ primary: true,type:'uuid',generated:'uuid'})
  tagsId!: string;
}
