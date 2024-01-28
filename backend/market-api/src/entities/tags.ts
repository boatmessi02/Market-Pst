import { Entity, Column} from 'typeorm';

@Entity({schema: 'marketdb'})
export class Tags {
  @Column({ primary: true,type:'uuid',generated:'uuid'})
  id!: string;

  @Column()
  name!: string;

  // @ManyToMany(() => Post, post => post.tags)
  // posts!: Post[];
}
