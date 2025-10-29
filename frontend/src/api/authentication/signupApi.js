import { baseurl } from "../baseurl/baseurl";

export const signupApi = async (data) => {
    try {
        const url = baseurl + "/api/v1/auth/signup";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};