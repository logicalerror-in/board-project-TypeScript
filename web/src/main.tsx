import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {RouterProvider} from "react-router";
import {router} from "./router.tsx";

createRoot(
  document.getElementById('root')!,
).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);