import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// layouts
import Main, { mainLoader } from "./layouts/Main";

// Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/", // we can alos do `index: true`
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <Error />
      },
    ]
  },
]);

function App() {

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
