import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import Employees from "./pages/Employees";
import AddEditEmployee from "./pages/AddEditEmployee/AddEditEmployee";
import { EMPLOYEE_FORM_TYPE } from "./pages/AddEditEmployee/formConstants";
import { BISTRO_FORM_TYPE } from "./pages/AddEditCafe/formConstants";
import AddEditBistro from "./pages/AddEditCafe/AddEditBistro";
import Bistros from "./pages/Bistros";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/bistros",
        element: <Bistros />,
      },
      {
        path: "/bistros/:id",
        element: <AddEditBistro type={BISTRO_FORM_TYPE.EDIT} />,
      },
      {
        path: "/bistros/new",
        element: <AddEditBistro type={BISTRO_FORM_TYPE.ADD} />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/employees/:id",
        element: <AddEditEmployee type={EMPLOYEE_FORM_TYPE.EDIT} />,
      },
      {
        path: "/employees/new",
        element: <AddEditEmployee type={EMPLOYEE_FORM_TYPE.ADD} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
