declare class UserController {
    signUpUser(req: any, res: any, next: any): Promise<any>;
    loginUser(req: any, res: any, next: any): Promise<any>;
    logOut(req: any, res: any, next: any): Promise<void>;
    UpdatePassword(req: any, res: any, next: any): Promise<any>;
    followUser(req: any, res: any, next: any): Promise<any>;
    getAccountDetails(req: any, res: any, next: any): Promise<void>;
    updateProfile(req: any, res: any, next: any): Promise<void>;
    updateAvatar(req: any, res: any, next: any): Promise<void>;
}
declare const _default: UserController;
export default _default;
