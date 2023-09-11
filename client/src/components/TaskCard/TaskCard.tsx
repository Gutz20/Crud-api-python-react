import { useNavigate } from "react-router-dom";
import { taskSchema } from "../../pages/TaskFormPage/TaskFormPage";

interface TaskCardProps {
  task: taskSchema;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-slate-950 hover:bg-slate-900 hover:cursor-pointer rounded-md p-4"
      onClick={() => navigate(`/tasks/new/${task.id}`)}
    >
      <h1 className="text-lg font-bold">{task.title}</h1>
      <p className="text-sm font-medium">{task.description}</p>
    </div>
  );
};

export default TaskCard;
