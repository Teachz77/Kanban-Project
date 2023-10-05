import { Suspense, lazy} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import SideMenu from './components/SideMenu'
import { RecoilRoot } from 'recoil'
import TaskSummary from './features/tasks/components/TaskSummary'
import TaskList from './features/tasks/components/TaskList/TaskList'
import TaskProgress from './features/tasks/components/TaskProgress/TaskProgress'

const SideMenuLayout = lazy(() => import('./layouts/SideMenuLayout'))
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <SideMenuLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <TaskSummary />
          </Suspense>
        ),
      },
      {
        path: '/task-list',
        element: <TaskList />
      },
      {
        path: '/task-progress',
        element: <TaskProgress />
      },
    ],
  },
],
{basename: '/Kanban-Project/'}, // Nama repository ditambahkan
)

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  )
}

export default App
