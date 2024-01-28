// post.entity.ts
import { Entity, Column } from "typeorm";

@Entity({ schema: "marketdb" })
export class Post {
  @Column({ primary: true, type: "uuid", generated: "uuid" })
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  posted_at!: Date;

  @Column()
  posted_by!: string;

  // @ManyToMany(() => Tags)
  // @JoinTable()
  // tags!: Tags[];
}
