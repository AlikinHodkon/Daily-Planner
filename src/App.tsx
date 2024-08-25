import { useEffect, useState } from "react"
import { IDays, ITask } from "./types";
import Day from "./components/Day";
import ArrowRight from "./components/ArrowRight";
import ArrowLeft from "./components/ArrowLeft";

function App() {
  const date = Date.now();
  const [isNext, setIsNext] = useState<boolean>(false);
  const [days, setDays] = useState<IDays[]>([]);
  const [tasks, setTasks] = useState<ITask[]>(localStorage.getItem("dailyTasks") ? JSON.parse(localStorage.getItem("dailyTasks") || "") : []);
  function addTask(task: string, date: string){
    setTasks([...tasks, {id: Date.now(), date: date, isComplete: false, task: task}]);
    localStorage.setItem("dailyTasks", JSON.stringify([...tasks, {id: Date.now(), date: date, isComplete: false, task: task}]));
  }
  function deleteTask(id: number){
    setTasks(tasks.filter((t) => t.id !== id));
    localStorage.setItem("dailyTasks", JSON.stringify(tasks.filter((t) => t.id !== id)));
  }
  function changeTask(id: number, isCompleted: boolean){
    setTasks(tasks.map((t) => t.id === id ? {...t, isComplete: isCompleted} : t ));
    localStorage.setItem("dailyTasks", JSON.stringify(tasks.map((t) => t.id === id ? {...t, isComplete: isCompleted} : t )));
  }
  const daysWeek = [
    'ВС',
    'ПН',
    'ВТ',
    'СР',
    'ЧТ',
    'ПТ',
    'СБ',
    'ВС'
  ];
  function generatePreviousDays(start: number, end: number){
    const days: IDays[] = [{id: 7, name: 'ВС', date: new Date(date).toLocaleDateString() }];
    for (let i = start; i >= end; i--){
      days.unshift({id: i, name: daysWeek[i], date: new Date(date-(24*60*60*1000)*(start-i+1)).toLocaleDateString() });
    }
    return days;
  }
  function generateOthersDays(start: number, end: number){
    const days: IDays[] = [];
    for (let i = start; i <= end; i++){
      days.push({id: i, name: daysWeek[i], date: new Date(date+(24*60*60*1000)*i).toLocaleDateString() });
    }
    return days;
  }
  function generateNextDays(start: number, end: number){
    const days: IDays[] = [];
    for (let i = start; i <= end; i++){
      days.push({id: i+7, name: daysWeek[i], date: new Date(date+(24*60*60*1000)*i).toLocaleDateString() });
    }
    return days;
  }
  useEffect(() => {
    switch(new Date().getDay()){
      case 0:{
        setDays(generatePreviousDays(6, 1).concat(generateNextDays(1,7)));
        return;
      }
      case 1:{
        setDays(generateOthersDays(2, 7).concat(generateNextDays(1,7)));
        return;
      }
      case 2:{
        setDays(generatePreviousDays(1, 1).concat(generateOthersDays(3,7)).concat(generateNextDays(1,7)));
        return;
      }
      case 3:{
        setDays(generatePreviousDays(2, 1).concat(generateOthersDays(4,7)).concat(generateNextDays(1,7)));
        return;
      }
      case 4:{
        setDays(generatePreviousDays(3, 1).concat(generateOthersDays(5,7)).concat(generateNextDays(1,7)));
        return;
      }
      case 5:{
        setDays(generatePreviousDays(4, 1).concat(generateOthersDays(6,7)).concat(generateNextDays(1,7)));
        return;
      }      
      case 6:{
        setDays(generatePreviousDays(5, 1).concat(generateOthersDays(7,7)).concat(generateNextDays(1,7)));
        return;
      }
    }
  }, [])
  return (
    <div className="flex h-[100%]">
      <button className={`${isNext ? "" : "hidden"} fixed left-2 top-[50%] scale-150`} onClick={() => setIsNext(!isNext)}><ArrowRight /></button>
      {isNext ? (days.filter((day) => day.id > 7)).map((day) => <Day key={day.id} day={day} tasks={tasks.filter((task) => task.date === day.date)} addTask={addTask} deleteTask={deleteTask} changeTask={changeTask} />) : (days.filter((day) => day.id <=7)).map((day) => <Day key={day.id} day={day} tasks={tasks.filter((task) => task.date === day.date)} addTask={addTask} deleteTask={deleteTask} changeTask={changeTask} />)}
      <button className={`${isNext ? "hidden" : ""} fixed right-2 top-[50%] scale-150`} onClick={() => setIsNext(!isNext)}><ArrowLeft /></button>
    </div>
  )
}

export default App