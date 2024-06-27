import { useContext } from "react";

import { ProjectsContext } from "../store/ProjectsContext.jsx";
import Tasks from "./Tasks.jsx";

export default function SelectedProject() {
  const { selectedProject, deleteProject } = useContext(ProjectsContext);

  if (!selectedProject) {
    return <div>No project selected</div>;
  }

  const formattedDate = new Date(selectedProject.dueDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this project?`)) {
      deleteProject();
    }
  };

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {selectedProject.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {selectedProject.description}
        </p>
      </header>
      <Tasks />
    </div>
  );
}
