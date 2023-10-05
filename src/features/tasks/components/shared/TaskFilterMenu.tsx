import React from "react"
import type { Dispatch, SetStateAction } from "react"
import type { CSSProperties } from "../../../../types"
import { TASK_PROGRESS_ID } from "../../../../constants/app"
// import { TASK_FILTER } from "../../../../constants/app"

interface TaskFilterMenuProps {
    setTaskFilter: Dispatch<SetStateAction<Array<number>>>
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

const TaskFilterMenu = ({ setTaskFilter, setIsMenuOpen }: TaskFilterMenuProps): JSX.Element => {
    return (
        <div style={styles.menu} >
            <div style={styles.menuItem}  onClick={(): void => {
                setTaskFilter([TASK_PROGRESS_ID.COMPLETED])
                setIsMenuOpen(false)
                
            }}>
                <span className="material-icons">done</span>
                Completed Tasks
            </div>
            <div style={styles.menuItem}  onClick={(): void => {
                setTaskFilter([
                    TASK_PROGRESS_ID.NOT_STARTED,
                    TASK_PROGRESS_ID.IN_PROGRESS,
                    TASK_PROGRESS_ID.WAITING])
                setIsMenuOpen(false)
            }}>
                <span className="material-icons">list</span>
                Uncompleted Tasks
            </div>
            <div style={styles.menuItem}  onClick={(): void => {
                setTaskFilter([0])
                setIsMenuOpen(false)
            }}>
                <span className="material-icons">menu_open</span>
                All Tasks
            </div>
        </div>
    )
}

const styles: CSSProperties = {
    menu: {
        backgroundColor: '#fff',
        border: '1px solid gray',
        padding: '8px',
        position: 'absolute',
        top: '120px',
        left: '290px',
        zIndex: 10,
    },
    menuItem: {
        display: 'flex',
        marginBottom: '8px',
        cursor: 'pointer',
    },

}

export default TaskFilterMenu 