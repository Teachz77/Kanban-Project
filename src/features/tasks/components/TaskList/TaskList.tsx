import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import type { Task, CSSProperties } from '../../../../types'
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE } from '../../../../constants/app'
import TaskFilterMenu from '../shared/TaskFilterMenu'
import TaskModal from '../shared/TaskModal'
import TaskListItem from './TaskListItem'
import { tasksState } from '../../TaskAtoms'
// import { tasksState } from '../../TaskAtoms'
// import { taskFilterState } from '../../TaskAtoms'
// import { filteredTasksSelector } from '../../TaskSelectors'


const TaskList = (): JSX.Element => {

    const tasks: Task[] = useRecoilValue(tasksState)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [filter, setFilter] = useState<Array<number>>([0])
    // const setTaskFilter = useSetRecoilState(taskFilterState)

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Your Tasks</h1>
            <div style={styles.taskButtons}>
                <button style={styles.button} onClick={(): void => {setIsModalOpen(true)}}>
                    <span className="material-icons">add</span>Add task
                </button>
                <button style={styles.button} onClick={(): void => {setIsMenuOpen(!isMenuOpen)}}>
                    <span className="material-icons">sort</span>Filter tasks
                </button>
                {/* {isMenuOpen && (
                    <TaskFilterMenu 
                        setTaskFilter={setTaskFilter} 
                        setIsMenuOpen={setIsMenuOpen}
                    />
                )} */}
            </div>
            <div>
                <div style={styles.tableHead}>
                    <div style={styles.tableHeaderTaskName}>
                        Task Name
                    </div>
                    <div style={styles.tableHeaderDetail}>
                        Detail
                    </div>
                    <div style={styles.tableHeaderDueDate}>
                        Due Date
                    </div>
                    <div style={styles.tableHeaderProgress}>
                        Progress
                    </div>
                </div>
                {tasks.filter((task) => {
                    if (filter.find((i) => i > 0 )) {
                        return filter.includes(task.progressOrder)
                    } else {
                        return true
                    }
                })
                .map((task) => (
                    <TaskListItem task={task} key={task.id} />
                ))}
                {/* {tasks.map((task: Task) => {
                    return <TaskListItem task={task} key={task.id} />
                })} */}
            </div>
            {isModalOpen && (
                <TaskModal 
                    headingTitle="Add your Task"
                    type={TASK_MODAL_TYPE.ADD}
                    setIsModalOpen={setIsModalOpen}
                    // setIsMenuOpen={setIsMenuOpen}
                    defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
                />
            )}
            {isMenuOpen && <TaskFilterMenu setTaskFilter={setFilter} setIsMenuOpen={setIsMenuOpen}/>}
        </div>
    )
}

const styles: CSSProperties = {
    container: {
        padding: '20px',
    },
    heading: {
        color: '#55C89F',
        marginBottom: '60px',
    },
    taskButtons: {
        display: 'flex',
        marginBottom: '30px',
        position: 'relative',
    },
    button: {
        padding: '16px',
        fontSize: '16px',
        marginRight: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    },
    tableHead: {
        display: 'flex',
        fontSize: '24px',
        borderBottom: '1px solid #D8D8D8',
    },
    tableHeaderTaskName: {
        padding: '16px',
        width: '15%',
    },
    tableHeaderDetail: {
        padding: '16px',
        width: '30%',
    },
    tableHeaderDueDate: {
        padding: '16px',
        width: '10%',
    },
    tableHeaderProgress: {
        padding: '16px',
        width: '15%',
    },
}

export default TaskList