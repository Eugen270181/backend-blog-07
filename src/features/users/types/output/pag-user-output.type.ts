import {UserOutputModel} from "./user-output.type";


  export type pagUserOutputModel = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: Array<UserOutputModel>
};
