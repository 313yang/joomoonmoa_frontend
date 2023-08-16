import { auth } from ".";

interface LoginType {
    email: string;
    password: string;
}

interface SignupType extends LoginType {
    name: string;
    phoneNumber: string;
}

export const login = async (data: LoginType) => await auth.post("/login", data);
export const signup = async (data: SignupType) => await auth.post("/signup", data);
