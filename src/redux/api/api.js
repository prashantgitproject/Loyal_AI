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

        vision: builder.mutation({
            query: (formData) => ({
                url: "ai/vision",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["ai"],
        }),

        openai4o: builder.mutation({
            query: (formData) => ({
                url: "ai/openai-4o",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["ai"],
        }),

        openaimini: builder.mutation({
            query: (formData) => ({
                url: "ai/openai-4o-mini",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["ai"],
        }),

        loyalAI: builder.mutation({
            query: (formData) => ({
                url: "ai/loyalai",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["ai"],
        }),

        wolfram: builder.mutation({
            query: (formData) => ({
                url: "ai/wolfram",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["ai"],
        }),

    }),
})

export default api;
export const { 
    useTestQuery,
    useVisionMutation,
    useOpenai4oMutation,
    useOpenaiminiMutation,
    useLoyalAIMutation,
    useWolframMutation,
 } = api;