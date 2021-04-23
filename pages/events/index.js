import { Fragment } from 'react'
import {useRouter} from 'next/router'

import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/event-search'

const AllEventsPage = () => {
	const router=useRouter()
	const events = getAllEvents()

	const findEventsHandler=(year, month)=>{
		const fullPath = `/events/${year}/${month}/`
		
		router.push(fullPath)
	}
	return (
		<Fragment>
			<EventsSearch onSearch={ findEventsHandler}/>
			<EventList data={events} />
		</Fragment>
	)
}

export default AllEventsPage
