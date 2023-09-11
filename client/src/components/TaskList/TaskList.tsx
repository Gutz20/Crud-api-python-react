import { useEffect, useState } from "react";
import { TaskCard } from "..";
import { getAllTasks } from "../../api";
import { taskSchema } from "../../pages/TaskFormPage/TaskFormPage";

const TaskList = () => {
  const [tasks, setTasks] = useState<taskSchema[]>();

  useEffect(() => {
    async function loadTasks() {
      const res = await getAllTasks();
      setTasks(res.data);
    }
    loadTasks();
  }, []);


  return (
    <div className="grid grid-cols-3 gap-3">
      {tasks?.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}

    </div>
  );
};

export default TaskList;
