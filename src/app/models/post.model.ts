import { Tag } from "./tags.model";

export class Post {
  public id: string;
  public attachments;
  public comments;
  public content;
  public stars: number;
  public tags: Tag[];
  public time: string;
  public user: string;
  public showComments: boolean;
  public starredUsers: string[];
}
