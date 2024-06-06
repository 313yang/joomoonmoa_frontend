import { AxiosResponse } from "axios";
import { auth } from ".";
import { LoginPayload } from "../Defines";

interface LoginType {
    password: string;
    phoneNumber: string;
    deviceToken: string | null;
}

interface SignupType extends LoginType {

}

export const login = async (data: LoginType) => await auth.post("/login", data);
export const signup = async (data: SignupType) => await auth.post("/signup", data);
export const changePassword = async (data: SignupType) => await auth.patch("/authentication-string", data);


export const sendOTP = async (phoneNumber: string, isUser = false) => await auth.post("/otp", { phoneNumber }, { params: isUser && { requestType: "IS_USER" } });
export const verifyOTP = async (phoneNumber: string, code: string) => await auth.post("/otp-verification", { phoneNumber, code });