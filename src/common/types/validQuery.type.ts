import {SortDirection} from "mongodb";


export type validQueryType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortDirection
    searchNameTerm: string | null
    searchLoginTerm: string | null
    searchEmailTerm: string | null
};