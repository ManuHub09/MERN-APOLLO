import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../graphql/Tasks";
import { useParams } from "react-router-dom";
export function TaskForm() {
  const [mutation] = useMutation(CREATE_TASK, {
    refetchQueries: ["getProject"],
  });
  const params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutation({
      variables: {
        title: e.target.title.value,
        projectId: params.id,
      },
    });
    e.target.reset();
    e.target.title.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">  
      <h1>Añadir tareas</h1>
      <input
        type="text"
        name="title"
        className=" bg-zinc-900 rounded-lg shadow-lg shadow-black p-2 mb-2"
      ></input>
      <button className=" bg-sky-900 rounded-lg shadow-lg shadow-black p-2">
        Add
      </button>
    </form>
  );
}
