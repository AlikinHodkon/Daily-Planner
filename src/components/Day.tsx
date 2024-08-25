import { useRef, useState } from "react";
import { IDays, ITask } from "../types"
import Task from "./Task";

interface DayProps{
    day: IDays,
    tasks: ITask[],
    addTask: (task: string, date: string, time: number) => void,
    deleteTask: (id: number) => void,
    changeTask: (id: number, isCompleted: boolean) => void
}
export default function Day({day, tasks, addTask, deleteTask, changeTask}: DayProps) {
    const [task, setTask] = useState<string>("");
    const inputRef= useRef();
  return (
    <div className="w-[15%] flex flex-col border-black border-[2px] min-h-[100vh]">
        <div className="text-[32px] border-b-2 border-black flex justify-center">
            <p>{day.name}</p>
            <p className="ml-2">{(day.date).substring(0, 5)}</p>
            </div>
        {tasks.map((task) => <Task key={task.id} task={task} deleteTask={deleteTask} changeTask={changeTask} />)}
        <div className="flex w-full mt-2">
            <input ref={inputRef} type="text" className="w-3/4 pl-2 rounded-xl border-black border-[2px]" onChange={(e) => setTask(e.target.value)} placeholder="Дело" />
            <button className="w-1/3" onClick={() => {addTask(task, day.date, day.time); inputRef.current.value = ""}}>Добавить</button>
        </div>
    </div>
  )
}
