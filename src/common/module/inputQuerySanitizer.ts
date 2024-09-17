import {anyQueryType} from "../types/anyQuery.type";
import {validQueryType} from "../types/validQuery.type";

export const inputQuerySanitizer = (query:anyQueryType):validQueryType =>{
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection === 'asc' ? query.sortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null,
    }
}