import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tokenService = {
  getLocalAccessToken: () => {
    return localStorage.getItem("Token");
  },
};
export const taskApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Content-type", "appliation/json");
      headers.set("businessUnit", "EUS,MPS");
      headers.set("auth-token", tokenService.getLocalAccessToken());
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    tasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
