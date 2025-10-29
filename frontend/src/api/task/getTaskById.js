import { baseurl } from "../baseurl/baseurl";

export const getTaskById = async (id) => {
    try {
        const url = baseurl + `/api/v1/task/details/${id}`;

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