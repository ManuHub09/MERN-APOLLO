import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/Tasks";
import { AiFillDelete } from "react-icons/ai";
export function TaskCard({ task }) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: ["getProject"],
  });
  return (
    <div className="flex">
      <h4 className="bg-zinc-800 w-full rounded-lg shadow-lg shadow-black p-4 mb-2 hover:bg-zinc-700 hover:cursor-pointer">
        {task.title}
      </h4>
      <button
        onClick={() => {
          deleteTask({
            variables: { id: task._id },
          });
        }}
      >
        <AiFillDelete />
      </button>
    </div>
  );
}
