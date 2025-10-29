import { baseurl } from "../baseurl/baseurl";

export const toggleApi = async (id) => {
    try {
        const url = baseurl + `/api/v1/task/update/toggle-task/${id}`;

        const response = await fetch(url, {
            method: "PUT",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    };
};