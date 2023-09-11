import axios, { AxiosResponse } from "axios";
import { taskSchema } from "../pages/TaskFormPage/TaskFormPage";

const tasksApi = axios.create({
  baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
});

export const getAllTasks = () => tasksApi.get("/");
export const getTask = (id: number): Promise<AxiosResponse<taskSchema>> =>
  tasksApi.get(`/${id}`);
export const createTask = (task: taskSchema) => tasksApi.post("/", task);
export const deleteTask = (id: number) => tasksApi.delete(`/${id}`);
export const updateTask = (id: number, task: taskSchema) =>
  tasksApi.put(`/${id}/`, task);
