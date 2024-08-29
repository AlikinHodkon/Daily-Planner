import { useState } from "react"
import Trash from "./Trash";
import { ITask } from "../types";

interface TaskProps{
    task: ITask,
    deleteTask: (id: number) => void,
    changeTask: (id: number, isCompleted: boolean) => void
}

export default function Task({task, deleteTask, changeTask}: TaskProps) {
    const [isComplete, setIsComplete] = useState<boolean>(task.isComplete);
  return (
    <div className={`flex mt-2 w-11/12 max-w-11/12 rounded-xl ${isComplete ? "bg-green-500" : "bg-red-500"}`}>
        <input checked={isComplete} onChange={() => {changeTask(task.id, !isComplete); setIsComplete(!isComplete);}} type="checkbox" className="ml-2" />
        <p className={`${isComplete ? "line-through" : ""} w-full text-center text-ellipsis overflow-hidden`}>{task.task}</p>
        <button className="ml-auto mr-2" onClick={() => deleteTask(task.id)}><Trash /></button>
    </div>
  )
}
