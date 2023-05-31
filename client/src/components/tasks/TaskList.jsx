import { TaskCard } from "./TaskCard";

export function TaskList({ tasks }) {
  console.log(tasks);
  return (
    <div>
      <h3>Tareas</h3>
      {tasks.map((task) => {
        return <TaskCard task={task} key={task._id} />;
      })}
    </div>
  );
}
