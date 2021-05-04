import { useContext, useRef } from 'react'
import classes from './newsletter-registration.module.css'
import NotificationContext from '../../store/notification-context'

const NewsletterRegistration = () => {
	const emailInputRef = useRef()
	const notificationCtx = useContext(NotificationContext)
	const registrationHandler = (e) => {
		e.preventDefault()
		const enteredEmail = emailInputRef.current.value
		notificationCtx.showNotification({
			title: 'Signing up ...',
			message: 'Registering for newsletter',
			status: 'pending',
		})
		fetch(`/api/newsletter`, {
			method: 'POST',
			body: JSON.stringify({ email: enteredEmail }),
			headers: {
				'content-type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
				return response.json().then((data) => {
					throw new Error(data.message || 'something went wrong !')
				})
			})
			.then(() => {
				notificationCtx.showNotification({
					title: 'Success',
					message: 'Successfully Registered..',
					status: 'success',
				})
			})
			.catch((error) => {
				notificationCtx.showNotification({
					title: 'Error!',
					message: error.message || 'something went wrong',
					status: 'error',
				})
			})
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
						ref={emailInputRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	)
}

export default NewsletterRegistration
