import { baseurl } from "../baseurl/baseurl";

export const allTaskApi = async (filters = {}) => {
    try {
        let url = baseurl + "/api/v1/task/all";

        const queryParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "" && value !== undefined) {
                queryParams.append(key, value);
            }
        });

        if (queryParams.toString()) {
            url += `?${queryParams.toString()}`;
        };

        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    }
};
