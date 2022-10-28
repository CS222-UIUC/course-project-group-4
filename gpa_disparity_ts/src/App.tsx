import Root from "./Root";
import React from "react";
import CourseInfoPage from "./CourseInfoPage";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css";

function PageNotFound() {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  );
}

const router = createBrowserRouter([
    { //root
      path: "/",
      element: <Root />,
      // child link
      children: [
        { path: "courseinfo/:subject/:course_number",
          element: <CourseInfoPage />,
        }, 
      ],
    }, 

    {
      path: "*", 
      element : <PageNotFound />,
    }
  ]);
  

function App() {
  // added null check bc compiler was complaining, so only will render if not null
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

  return (
    <div className="App">
    </div>
  );
}

export default App;
