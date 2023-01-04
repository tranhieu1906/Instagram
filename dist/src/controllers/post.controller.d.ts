declare class PostController {
    newPost(req: any, res: any, next: any): Promise<void>;
    deletePost(req: any, res: any, next: any): Promise<any>;
    updateCaption(req: any, res: any, next: any): Promise<any>;
    likeUnlikePost(req: any, res: any, next: any): Promise<any>;
    newComment(req: any, res: any, next: any): Promise<any>;
    DeleteComment(req: any, res: any, next: any): Promise<any>;
    updateComment(req: any, res: any, next: any): Promise<any>;
}
declare const _default: PostController;
export default _default;
