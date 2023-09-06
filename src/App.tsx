import { useState, Suspense, lazy} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import { RecoilRoot } from 'recoil'
import TaskSummary from './features/tasks/components/TaskSummary'

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
    ],
  },
  {
    path: 'task-list',
    element: (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <h1>Task List</h1>
    </div>
    ),
  },
  {
    path: 'task-progress',
    element: (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <h1>Task Progress</h1>
    </div>
    ),
  },

  
])

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  )
}

export default App
