import mongoose from "mongoose";

const ProjectSechema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true } //campo de cuando se creo, cuando se actualiza y etc
);

export default mongoose.model("Project", ProjectSechema);
