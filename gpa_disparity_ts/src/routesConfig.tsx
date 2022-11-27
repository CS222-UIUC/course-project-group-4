import { PageNotFound } from "./components/PageNotFound";
import CourseInfoPage from "./routes/CourseInfoPage";
import GpaChartPage from "./routes/GpaChartPage";

// https://stackoverflow.com/questions/74399490/how-to-test-routing-logic-with-react-router-v6-and-testing-library
const routesConfig = [
  {
    path: "/",
    element: <GpaChartPage />,
  },

  {
    path: "/courseinfo",
    element: <CourseInfoPage />,
  },

  {
    path: "/courseinfo/:subj/:num",
    element: <CourseInfoPage />,
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routesConfig;
