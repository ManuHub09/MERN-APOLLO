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
    <form onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <input
        type="text"
        name="name"
        placeholder="write a name"
        onChange={handleChange}
      ></input>
      <textarea
        name="description"
        rows="3"
        placeholder="wirte a description"
        onChange={handleChange}
      ></textarea>
      <button disabled={!project.name || !project.description || loading}>
        Save
      </button>
    </form>
  );
}
