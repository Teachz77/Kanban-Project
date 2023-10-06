import {useState} from "react"
import { TASK_PROGRESS_ID, TASK_PROGRESS_STATUS, TASK_MODAL_TYPE } from "../../../../constants/app"
import type { Task, CSSProperties } from "../../../../types"
import { useTasksAction } from "../../hooks/Tasks"
import type { Dispatch, SetStateAction } from "react"

interface TaskFormProps {
    defaultProgressOrder: number
    type: string
    task?: Task
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}

const TaskForm = ({ defaultProgressOrder, type, task, setIsModalOpen, setIsMenuOpen, }: TaskFormProps): JSX.Element => {
    const [ title, setTitle ] = useState<string>( task ? task.title : '')
    const [ detail, setDetail ] = useState<string>( task ? task.detail : '')
    const [ dueDate, setDueDate ] = useState<string>( task ? task.dueDate : '')
    const [ progressOrder, setProgressOrder ] = useState<number>( task ? task.progressOrder : defaultProgressOrder)

    const { addTask, editTask } = useTasksAction()

    const handleSumbit = (): void => {
        if (type === TASK_MODAL_TYPE.ADD) {
            addTask(title, detail, dueDate, progressOrder)
            setIsModalOpen(false)
        }
        if (!task) return

        if (type === TASK_MODAL_TYPE.EDIT) {
            editTask(task.id, title, detail, dueDate, progressOrder)
            setIsModalOpen(false)
                if (setIsMenuOpen) {
                    setIsMenuOpen(false)
                }
        }
    }


    return (
        <form style={styles.form}>
            <div style={styles.formItem}>
                <label>Title: </label>
                <input type="text" value={title} style={styles.formInput} onChange={(e): void => {setTitle(e.target.value)}} />
            </div>
            <div style={styles.formItem}>
                <label>Detail: </label>
                <textarea value={detail} style={styles.formTextArea} onChange={(e): void => {setDetail(e.target.value)}}></textarea>
            </div>
            <div style={styles.formItem}>
                <label>Due Date: </label>
                <input type="date" value={dueDate} style={styles.formInput} onChange={(e): void => {setDueDate(e.target.value)}} />
            </div>
            <div style={styles.formItem}>
                <label>Progress: </label>
                <select defaultValue={progressOrder} style={styles.formInput} onChange={(e): void => {setProgressOrder(Number(e.target.value))}}>
                    <option value={TASK_PROGRESS_ID.NOT_STARTED}>
                    {TASK_PROGRESS_STATUS.NOT_STARTED}
                    </option>
                    <option value={TASK_PROGRESS_ID.IN_PROGRESS}>
                        {TASK_PROGRESS_STATUS.IN_PROGRESS}
                    </option>
                    <option value={TASK_PROGRESS_ID.WAITING}>
                        {TASK_PROGRESS_STATUS.WAITING}
                    </option>
                    <option value={TASK_PROGRESS_ID.COMPLETED}>
                        {TASK_PROGRESS_STATUS.COMPLETED}
                    </option>
                </select>
            </div>
            <button type="button" style={styles.button} onClick={(): void => {handleSumbit()}}>
                Submit
            </button>
        </form>
    )
}

const styles: CSSProperties = {
    form: {
        fontSize: '24px',
    },
    formItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '16px',
    },
    formInput: {
        height: '40px',
        fontSize: '20px',
    },
    formTextArea: {
        height: '80px',
        fontSize: '20px',
    },
    button: {
        backgroundColor: '#55C89F',
        color: '#fff',
        fontSize: '20px',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '4px',
    },
}

export default TaskForm