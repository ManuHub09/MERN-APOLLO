import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECTS, GET_PROJECTS } from "../graphql/project.js";
export function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    //actualiza cada atributo sin borrar el uno o el otro atributo
    setProject({ ...project, [name]: value }); //... dice que mantega los valores
  };

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECTS, {
    refetchQueries: [{ query: GET_PROJECTS }, "Gt_projects"],
  });

  const handleSubmit = (e) => {
    e.preventDefault(); //para que no reinicie la pagina
    createProject({
      variables: {
        name: project.name,
        description: project.description,
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="w-2/5">
      {error && <p>{error.message}</p>}
      <input
        type="text"
        name="name"
        placeholder="write a name"
        onChange={handleChange}
        className="bg-zinc-800 rounded-lg shadow-lg p-4 block w-full mb-3"
      ></input>
      <textarea
        name="description"
        rows="3"
        placeholder="wirte a description"
        onChange={handleChange}
        className="bg-zinc-800 rounded-lg shadow-lg p-4 block w-full mb-3"
      ></textarea>
      <button disabled={!project.name || !project.description || loading}>
        Save
      </button>
    </form>
  );
}
