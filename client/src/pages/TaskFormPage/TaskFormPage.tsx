import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { createTask, deleteTask, getTask, updateTask } from "../../api";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const taskSchemaZod = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
});

export type taskSchema = z.infer<typeof taskSchemaZod>;

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<taskSchema>({
    resolver: zodResolver(taskSchemaZod),
  });
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(Number(params.id), data);
      toast.success("Tarea Actualizada", {
        position: "bottom-right",
        className: `bg-black text-white font-semibold`,
      });
    } else {
      await createTask(data);
      toast.success("Tarea Creada", {
        position: "bottom-right",
        className: `bg-black text-white font-semibold`,
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { title, description },
        } = await getTask(Number(params.id));
        setValue("title", title);
        setValue("description", description);
      }
    }
    loadTask();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={onSubmit}
        className=""
      >
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && (
          <span className="text-red-500 font-normal text-xs">
            {errors.title.message}
          </span>
        )}
        <textarea
          rows={3}
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && (
          <span className="text-red-500 font-normal text-xs">
            {errors.description.message}
          </span>
        )}
        <button
          className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
          type="submit"
        >
          Save
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            onClick={async () => {
              const accepted = window.confirm("are you sure?");
              if (accepted) {
                await deleteTask(Number(params.id));
                toast.success("Tarea Eliminada", {
                  position: "bottom-right",
                  className: `bg-black text-white font-semibold`,
                });
                navigate("/tasks");
              }
            }}
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFormPage;
