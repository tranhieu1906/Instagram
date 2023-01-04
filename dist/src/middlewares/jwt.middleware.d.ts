declare class Token {
    signAccessToken(data: any): Promise<unknown>;
    signRefreshToken(userID: any): Promise<unknown>;
    veryfyAccessToken(req: any, res: any, next: any): void;
}
declare const _default: Token;
export default _default;
