import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LayoutComponent from "components/layout"
import { lazy, Suspense } from "react"

// Lazy-loaded components
const Home = lazy(() => import("pages/Home"))
const DailyPlan = lazy(() => import("modules/daily-plan"))
const Goals = lazy(() => import("modules/goals"))
const Statistics = lazy(() => import("modules/Statistics"))
const Profile = lazy(() => import("modules/profile/list/index"))
const Settings = lazy(() => import("modules/settings/index"))
const AuthPage = lazy(() => import("pages/Login/index"))
const AllPlans = lazy(() => import("modules/all-plans/index"))
const NotesContainer = lazy(() => import("modules/notes/index"))
const LandingPage = lazy(() => import("pages/Landing/landing"))


// Fix for React Router future flag warnings
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPage />
        </Suspense>
      )

    },
    {
      path: "/",
      element: <LayoutComponent />,
      children: [
        {
          index: true,
          path: "home",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          index: true,
          path: "dailyplan",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <DailyPlan />
            </Suspense>
          ),
        },
        {
          index: true,
          path: "goals",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Goals />
            </Suspense>
          ),
        },
        {
          index: true,
          path: "statistics",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Statistics />
            </Suspense>
          ),

        },
        {
          index: true,
          path: "profile",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          ),
        },
        {
          index: true,
          path: "settings",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Settings />
            </Suspense>
          ),
        },
        {
          index: true,
          path: "allplans",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AllPlans />
            </Suspense>
          ),
        },
        {
          index: true,
          path: "notes",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <NotesContainer />
            </Suspense>
          ),
        }


      ],
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AuthPage />
        </Suspense>
      ),
    },
  ],
)

export default function BrowserRouter() {
  return <RouterProvider router={router} />
}

