import { Fragment, useContext } from 'react'
import MainHeader from './main-header'
import Notification from '../ui/notification'
import NotificationContext from '../../store/notification-context'

const Layout = ({ children }) => {
	const notificationctx = useContext(NotificationContext)
	const activeNotfication = notificationctx.notification
	return (
		<Fragment>
			<MainHeader />
			<main>{children}</main>
			{activeNotfication && (
				<Notification
					title={activeNotfication.title}
					message={activeNotfication.message}
					status={activeNotfication.status}
				/>
			)}
		</Fragment>
	)
}
export default Layout
