import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { server } from "../../constants/config";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["ai"],

    endpoints: (builder) => ({

        test: builder.query({
            query: () => "ai/test",
            providesTags: ["ai"],
        }),

    }),
})

export default api;
export const { useTestQuery } = api;