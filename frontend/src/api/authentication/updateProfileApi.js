import { baseurl } from "../baseurl/baseurl";

export const updateProfileApi = async (data) => {
    try {
        const url = baseurl + "/api/v1/auth/update-profile";

        const response = await fetch(url, {
            method: "PUT",
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