import { useContext, useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'

const Comments = (props) => {
	const { eventId } = props
	const notificationCtx = useContext(NotificationContext)

	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState([])
	const [isFetchingComments, setIsFetchingComments] = useState(false)

	useEffect(() => {
		if (showComments) {
			setIsFetchingComments(true)
			fetch('/api/comments/' + eventId)
				.then((response) => response.json())
				.then((data) => {
					setComments(data.comments)
					setIsFetchingComments(false)
				})
		}
	}, [showComments])

	const toggleCommentsHandler = () => {
		setShowComments((prevStatus) => !prevStatus)
	}

	const addCommentHandler = (commentData) => {
		notificationCtx.showNotification({
			title: 'Posting Comment',
			message: 'waiting to post comment',
			status: 'pending',
		})
		fetch(`/api/comments/` + eventId, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
				return response.json().then((data) => {
					throw new Error(data.message || 'Something Went Wrong')
				})
			})
			.then(() => {
				notificationCtx.showNotification({
					title: 'Success',
					message: 'Comment Posted Successfully',
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
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !isFetchingComments && (
				<CommentList items={comments} />
			)}
			{showComments && isFetchingComments && <p>Loading Comments ......</p>}
		</section>
	)
}

export default Comments
