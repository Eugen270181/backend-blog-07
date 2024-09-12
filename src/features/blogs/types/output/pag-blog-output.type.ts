import { BlogOutputModel } from './blog-output.type';

export type pagBlogOutputModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: Array<BlogOutputModel>
};
