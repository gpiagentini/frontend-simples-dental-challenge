export class LoginData {
    login: string;
    expirationTime: number;
    
    constructor(login: string, expirationTime: number) {
        this.login = login;
        this.expirationTime = expirationTime;
    }
}