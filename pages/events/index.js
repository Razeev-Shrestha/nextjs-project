import { Fragment } from 'react'
import { useRouter } from 'next/router'

import { getAllEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/event-search'

const AllEventsPage = ({ events }) => {
	const router = useRouter()

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}/`

		router.push(fullPath)
	}
	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList data={events} />
		</Fragment>
	)
}

export async function getStaticProps() {
	const allEvents = await getAllEvents()

	return {
		props: {
			events: allEvents,
		},
		revalidate: 60,
	}
}

export default AllEventsPage
