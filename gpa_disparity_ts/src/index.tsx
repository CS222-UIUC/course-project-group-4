import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import CourseInfoPage from "./routes/CourseInfoPage";
import GpaChartPage from "./routes/GpaChartPage";

function PageNotFound() {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <GpaChartPage />,
  },

  {
    path: "courseinfo/:subj/:num",
    element: <CourseInfoPage />,
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
