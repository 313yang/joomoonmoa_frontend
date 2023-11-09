import { AxiosResponse } from "axios";
import { auth } from ".";
import { LoginPayload } from "../Defines";

interface LoginType {
    password: string;
    phoneNumber: string;
}

interface SignupType extends LoginType {
   
}

export const login = async (data: LoginType) => await auth.post("/login", data);
export const signup = async (data: SignupType) => await auth.post("/signup", data);

export const sendOTP = async (phoneNumber: string) => await auth.post("/otp", { phoneNumber });
export const verifyOTP = async (phoneNumber: string, code: string) => await auth.post("/otp-verification", { phoneNumber, code });