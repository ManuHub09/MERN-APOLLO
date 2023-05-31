import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/project";
import { TaskList } from "../components/tasks/TaskList";
import { TaskForm } from "../components/tasks/TaskForm";
export function ProjectDetail() {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id,
    },
    skip: !params.id,
  });

  if (loading) return <p>Loading ... </p>;
  if (error) return <p>Error!</p>;
  console.log(data);
  return (
    <div className=" bg-zinc-900 rounded-lg shadow-lg shadow-black p-8 h-4/5 w-3/5">
      <h1>NOMBRE : {data.project.name}</h1>
      <p>DESCRIPCION: {data.project.description}</p>

      <TaskForm />
      <TaskList tasks={data.project.tasks} />
    </div>
  );
}
