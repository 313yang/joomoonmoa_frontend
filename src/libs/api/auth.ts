import { auth } from ".";

interface LoginType {
    id: string;
    password: string;
}

interface SignupType extends LoginType {
    phoneNumber: string;
}

export const login = async (data: LoginType) => {
    // const res = await auth.post("/login", data);
    console.log(data);
    return {
        accessToken: "11111",
        refreshToken: "2222222222"
    };

};
export const signup = async (data: SignupType) => await auth.post("/signup", data);
