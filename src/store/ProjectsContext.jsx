import { createContext, useState } from "react";

import { v4 as uuidv4 } from "uuid";

export const ProjectsContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  selectProject: () => {},
  startAddProject: () => {},
  cancelAddProject: () => {},
  addProject: () => {},
  deleteProject: () => {},
  selectedProject: undefined,
});

export default function ProjectsContextProvider({ children }) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  // selectedProject can be 3 different values. "null" for creating a new project. "undefined" for default page. "id" for a specific added project.

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = uuidv4();
      const newTask = {
        text,
        id: taskId,
        projectId: prevState.selectedProjectId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => id !== task.id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      let projectId = uuidv4();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  const ProjectCtxValue = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    selectProject: handleSelectProject,
    startAddProject: handleStartAddProject,
    cancelAddProject: handleCancelAddProject,
    addProject: handleAddProject,
    deleteProject: handleDeleteProject,
    selectedProject,
  };

  return (
    <ProjectsContext.Provider value={ProjectCtxValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
