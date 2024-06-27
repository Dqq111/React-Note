import { useContext } from "react";
import { ProjectsContext } from "../store/ProjectsContext.jsx";
import Button from "./Button.jsx";

export default function ProjectsSidebar() {
  const { startAddProject, projects, selectProject, selectedProjectId } =
    useContext(ProjectsContext);

  // Debugging logs
  console.log("Projects:", projects);
  console.log("Selected Project ID:", selectedProjectId);

  if (!projects || projects.length === 0) {
    return (
      <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
          Your Project
        </h2>
        <div>
          <Button onClick={startAddProject}>+ Add Project</Button>
        </div>
        <p className="text-stone-400 mt-4">No projects available.</p>
      </aside>
    );
  }

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={startAddProject}>+ Add Project</Button>
      </div>

      <ul>
        {projects.map((project) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if (project.id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }

          return (
            <li key={project.id}>
              <button
                className={cssClasses}
                onClick={() => selectProject(project.id)}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
