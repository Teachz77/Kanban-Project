import { useRecoilState } from "recoil"
import { tasksState } from "../TaskAtoms"
import type { Task } from "../../../types"
import { TASK_PROGRESS_ID } from "../../../constants/app"

interface useTaskActionType {
    completeTask: (taskId: number) => void
    moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
    addTask: (
        title: string,
        detail: string,
        dueDate: string,
        progressOrder: number,
    ) => void
    editTask: (
        taskId: number,
        title: string,
        detail: string,
        dueDate: string,
        progressOrder: number,
    ) => void
    deleteTask: (
        taskId: number
    ) => void
}

export const useTasksAction = (): useTaskActionType => {

    const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)

    const completeTask = (taskId: number): void => {
        const updatedTasks: Task[] = tasks.map((task) => task.id === taskId
        ? {...task, progressOrder: TASK_PROGRESS_ID.COMPLETED}: task,)

        setTasks(updatedTasks)
    }

    const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
        const movedTask: Task | undefined = tasks.find(
            (task): boolean => task.id === taskId,
        )
        if (!movedTask) return

        const isOutOfBounds: boolean = 
            movedTask.progressOrder + directionNumber < 1 ||
            movedTask.progressOrder + directionNumber > 4

        if (isOutOfBounds) return

        const updatedOrder: number = movedTask.progressOrder + directionNumber

        const updatedTasks = tasks.map((task) =>
         task.id === taskId ? {...task, progressOrder: updatedOrder }: task,
        )

        setTasks(updatedTasks)
    }

    const addTask = (
        title: string,
        detail: string,
        dueDate: string,
        progressOrder: number,
    ): void => {
        const newTask: Task = {
            id: tasks.length + 1,
            title,
            detail,
            dueDate,
            progressOrder,
        }
        setTasks([...tasks, newTask])
    }

    const editTask = (
        taskId: number,
        title: string,
        detail: string,
        dueDate: string,
        progressOrder: number,
    ): void => {
        const updatedTasks: Task[] = tasks.map((task) =>
        task.id === taskId 
        ?  {
            ...task,
            title,
            detail,
            dueDate,
            progressOrder,
           }
        : task,
        )
        setTasks(updatedTasks)
    }

    const deleteTask = (taskId: number): void => {
        setTasks(tasks.filter((task): boolean => task.id !== taskId))
    }

    return {
        completeTask, moveTaskCard, addTask, editTask, deleteTask
    }
       
}