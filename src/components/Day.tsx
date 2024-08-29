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
    const inputText = useRef<null | HTMLInputElement>(null);
  return (
    <div className="w-[15%] max-w-[15%] flex flex-col border-[#323232] border-[1px] min-h-[100vh]">
        <div className="text-[32px] border-b-2 border-b-[#323232] flex justify-center">
            <p>{day.name}</p>
            <p className="ml-2">{(day.date).substring(0, 5)}</p>
            </div>
        <div className="w-full flex flex-col justify-center items-center">
            {tasks.map((task) => <Task key={task.id} task={task} deleteTask={deleteTask} changeTask={changeTask} />)}
        </div>
        <div className="flex w-full mt-2">
            <input ref={inputText} type="text" className="w-4/6 pl-2 ml-2 mr-2 rounded-xl border-[#717173] bg-[#717173] border-[2px]" onChange={(e) => setTask(e.target.value)} placeholder="Дело" />
            <button className="w-1/3 rounded-[6px] mr-2 text-[14px] bg-[#4770FF]" onClick={() => {if (inputText.current?.value) {addTask(task, day.date, day.time); inputText.current.value = "";}}}>Добавить</button>
        </div>
    </div>
  )
}
