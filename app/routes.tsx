import { createBrowserRouter } from "react-router-dom"
import Dashboard from "./page"
import LandingPage from "./landing/page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
])

