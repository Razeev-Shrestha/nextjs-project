import EventList from '../components/events/event-list'
import {getFeaturedEvents} from '../dummy-data'
const HomePage = () => {
	const featuredEvents=getFeaturedEvents()
	return (
		<div>
			<EventList data={featuredEvents}/>
		</div>
	)
}

export default HomePage
