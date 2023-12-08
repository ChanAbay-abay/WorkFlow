import axiosInstance from "./axios";
import Endpoints from "./endpoint";

export const CreatingTask = {
    CREATE_TASK: (data) => axiosInstance.post(Endpoints.CREATE_TASKS,data)
}
export const ListTask = {
    LIST_TASK: () => axiosInstance.get(Endpoints.TASK_LISTS)
}
export const DoneTask = {
    DONE_TASK: (data) => axiosInstance.post(Endpoints.DONE_TASK,data)
}
export const UpdateTask = {
    UPDATE_TASK: (data) => axiosInstance.post(Endpoints.UPDATE_TASK,data)
}