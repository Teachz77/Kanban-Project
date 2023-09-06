import { Outlet } from "react-router-dom"
import SideMenu from "../components/SideMenu"

const SideMenuLayout = () => {
    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <SideMenu />
            </div>
            <div style={styles.main}>
                <Outlet />
            </div>
        </div>
    )
}

const styles = {
    container: {
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
    },
    sidebar: {
      width: '20%',
    },
    main: {
      width: '80%',
    },
}

export default SideMenuLayout