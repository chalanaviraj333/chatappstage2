export interface User {
    userID: number;
    username: string;
    userRole: string;
    email: string;
    password: string;
    groups: string[];
    channels: string[];
    userpicture: string;
}