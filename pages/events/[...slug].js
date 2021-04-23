import { Fragment } from 'react'
import { useRouter } from 'next/router'

import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

const FilteredEventsPage = () => {
	const router = useRouter()
	const filteredData = router.query.slug
	if (!filteredData) {
		return <p className='center'>Loading...</p>
	}

	const filteredYear = filteredData[0]
	const filteredMonth = filteredData[1]

	const numYear = +filteredYear
	const numMonth = +filteredMonth

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2020 ||
		numMonth > 12 ||
		numMonth < 1
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid Filter. Please Adjust your values</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'> Show All Events</Button>
				</div>
			</Fragment>
		)
	}

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth,
	})

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No Events Found for the chosen Filter!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'> Show All Events </Button>
				</div>
			</Fragment>
		)
	}

	const date = new Date(numYear, numMonth - 1)

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList data={filteredEvents} />
		</Fragment>
	)
}

export default FilteredEventsPage
