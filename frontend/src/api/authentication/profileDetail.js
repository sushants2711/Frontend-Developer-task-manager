import { baseurl } from "../baseurl/baseurl";

export const profileDetailsAPi = async () => {
    try {
        const url = baseurl + "/api/v1/auth/profile-detail";

        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};