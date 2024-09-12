//import {CreateBlogInputModel} from "../../features/blogs/types/input/create-blog-input.type";
//import {CreatePostInputModel} from "../../features/posts/types/input/create-post-input.type";
//import {CreateUserInputModel} from "../../features/users/types/input/create-user-input.type";



//export type FieldNamesType = keyof CreateBlogInputModel | keyof CreatePostInputModel | keyof CreateUserInputModel;
// const f: FieldsType = 'some' // error
export type errorsMessagesType = {message: string, field: string}
export type OutputErrorsType = {
    errorsMessages: errorsMessagesType[]
}