import Head from 'next/head'
import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'

const HomePage = ({ events }) => {
	return (
		<div>
			<Head>
				<title>NextJs Events</title>
				<meta
					name='description'
					content='Find a lot of description of events'
				/>
			</Head>
			<EventList data={events} />
		</div>
	)
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents()
	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 3600,
	}
}

export default HomePage
