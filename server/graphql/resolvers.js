import Project from "../models/Project.js";
import Task from "../models/Task.js";
//aqui resolvemos esa funcion definidas en el typeDefs

export const resolvers = {
  Query: {
    hello: () => "hello world",
    projects: async () => await Project.find(),
    tasks: async () => await Task.find(),
    project: async (_, { _id }) => await Project.findById(_id),
    tasks: async (_, { _id }) => await Task.findById(_id),
  },
  Mutation: {
    createProject: async (_, { name, description }) => {
      const project = new Project({ name, description });
      const saveProject = await project.save();
      return saveProject;
    },
    createTask: async (_, { title, projectId }) => {
      const projectFound = await Project.findById(projectId);

      if (!projectFound) throw new Error("Project not found");

      const task = new Task({ title, projectId });
      const taskSaved = await task.save();

      return taskSaved;
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);

      if (!deletedProject) throw new Error("Project not found");

      await Task.deleteMany({ projectId: deletedProject._id }); //deletemany borra todos

      return deletedProject;
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = Task.findByIdAndDelete(_id);

      if (!deletedTask) throw new Error("Task not found");

      return deletedTask;
    },
    updateProject: async (_, args) => {
      const updateProject = await Project.findByIdAndUpdate(args._id, args, {
        new: true, //me devuelve un boleano, con esto true quiero que me devuleva el objeto
      });

      if (!updateProject) throw new Error("Task not found");

      return updateProject;
    },
    updateTask: async (_, args) => {
      const updateTask = await Task.findByIdAndUpdate(args._id, args, {
        new: true, //me devuelve un boleano, con esto true quiero que me devuleva el objeto
      });

      if (!updateTask) throw new Error("Task not found");

      return updateTask;
    },
  },
  //RELACIONES ENTRE TIPOS
  //Importante si hago consulta o mutacion dentro de un objeto
  //y que a su vez es a otro ya no va en mutacion ni query

  Project: {
    tasks: async (parent) => {
      const tasks = await Task.find({ projectId: parent._id });
      return tasks;
    },
  },
  Task: {
    project: async (parent) => {
      await Project.findById(parent.projectId);
    },
  },
};
