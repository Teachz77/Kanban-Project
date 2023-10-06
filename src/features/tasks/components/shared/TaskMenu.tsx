import { useState} from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Task, CSSProperties } from '../../../../types'
import { useTasksAction } from '../../hooks/Tasks'
import TaskModal from './TaskModal'
import { TASK_MODAL_TYPE } from '../../../../constants/app'

interface TaskMenuProps {
    task: Task
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

const TaskMenu = ({ task, setIsMenuOpen }: TaskMenuProps): JSX.Element => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const {deleteTask} = useTasksAction()

    return (
        <div style={styles.menu}>
            <div style={styles.menuItem} onClick={(): void =>{
                setIsModalOpen(true)
            }}>
                <span className="material-icons">edit</span>
                Edit
            </div>
            <div style={styles.menuItem} onClick={(): void => {deleteTask(task.id)}}>
                <span className="material-icons" >delete</span>
                Delete
            </div>
           
            <span className="material-icons" style={styles.closeIcon} onClick={(): void => {setIsMenuOpen(false)}}>
                    close
            </span>
            
            {isModalOpen && (
                <TaskModal 
                   headingTitle= "Edit Your Task"
                   type={TASK_MODAL_TYPE.EDIT}
                   setIsModalOpen={setIsModalOpen}
                //    setIsMenuOpen={setIsMenuOpen}
                   task={task}
                   defaultProgressOrder={task.progressOrder}
                />
            )}
        </div>
    )
}

const styles: CSSProperties = {
    menu: {
        backgroundColor: '#fff',
        border: '1px solid gray',
        padding: '15px 20px',
        position: 'absolute',
        top: '-10px',
        right: '4%',
        zIndex: 10,
    },
    menuItem: {
        display: 'flex',
        marginBottom: '8px',
        cursor: 'pointer',
    },
    closeIcon: {
        position: 'absolute',
        top: '3px',
        right: '1px',
        cursor: 'pointer',
    },
}

export default TaskMenu