import { auth } from ".";

interface LoginType {
    account: string;
    password: string;
}

interface SignupType extends LoginType {
    phoneNumber: string;
}

export const login = async (data: LoginType) => await auth.post("/login", data);
export const signup = async (data: SignupType) => await auth.post("/signup", data);

export const sendOTP = async (phoneNumber: string) => await auth.post("/otp", { phoneNumber });