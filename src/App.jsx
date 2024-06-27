import { useContext } from "react";

import { ProjectsContext } from "./store/ProjectsContext.jsx";

import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
import ProjectsContextProvider from "./store/ProjectsContext.jsx";

function App() {
  return (
    <ProjectsContextProvider>
      <MainContent />
    </ProjectsContextProvider>
  );
}

function MainContent() {
  const { selectedProjectId } = useContext(ProjectsContext);

  let content;

  if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  } else if (selectedProjectId === null) {
    content = <NewProject />;
  } else {
    content = <SelectedProject />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
}

export default App;
