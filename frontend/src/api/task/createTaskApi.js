import { baseurl } from "../baseurl/baseurl";

export const createTaskApi = async (data) => {
    try {
        const url = baseurl + "/api/v1/task/add";

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