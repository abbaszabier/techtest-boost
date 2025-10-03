import Dexie from "dexie";
import { Post } from "./schemas";

export class BlogDB extends Dexie {
  posts!: Dexie.Table<Post, string>;

  constructor() {
    super("blog_db");
    this.version(1).stores({ posts: "id, title, author, category, createdAt" });
  }
}

export const db = new BlogDB();
