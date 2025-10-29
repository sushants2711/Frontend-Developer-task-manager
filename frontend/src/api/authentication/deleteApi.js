import { baseurl } from "../baseurl/baseurl";

export const deleteApi = async () => {
    try {
        const url = baseurl + "/api/v1/auth/delete";

        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};