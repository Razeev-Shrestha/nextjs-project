import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'

const HomePage = ({ events }) => {
	return (
		<div>
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
