import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Head from 'next/head'

import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

const FilteredEventsPage = () => {
	const [loadedEvents, setLoadedEvents] = useState()
	const router = useRouter()
	const filteredData = router.query.slug

	const { data, error } = useSWR(
		'https://nextjs-events-164f1-default-rtdb.firebaseio.com/events.json'
	)
	useEffect(() => {
		if (data) {
			const events = []

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				})
			}
			setLoadedEvents(events)
		}
	}, [data])

	let pageHeadData = (
		<Head>
			<title>Searched Events</title>
			<meta
				name='description'
				content={`All events for of filtered events`}
			/>
		</Head>
	)
	if (!loadedEvents) {
		return (
			<Fragment>
				{pageHeadData}
				<p className='center'>Loading...</p>
			</Fragment>
		)
	}

	const filteredYear = filteredData[0]
	const filteredMonth = filteredData[1]

	const numYear = +filteredYear
	const numMonth = +filteredMonth

	pageHeadData = (
		<Head>
			<title>Searched Events</title>
			<meta
				name='description'
				content={`All events for ${numYear}/${numMonth}`}
			/>
		</Head>
	)

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2020 ||
		numMonth > 12 ||
		numMonth < 1 ||
		error
	) {
		return (
			<Fragment>
				{pageHeadData}
				<ErrorAlert>
					<p>Invalid Filter. Please Adjust your values</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'> Show All Events</Button>
				</div>
			</Fragment>
		)
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date)
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		)
	})
	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				{pageHeadData}
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
			{pageHeadData}
			<ResultsTitle date={date} />
			<EventList data={filteredEvents} />
		</Fragment>
	)
}

// export async function getServerSideProps(context) {
// 	const { params } = context
// 	const filteredData = params.slug
// 	const filteredYear = filteredData[0]
// 	const filteredMonth = filteredData[1]

// 	const numYear = +filteredYear
// 	const numMonth = +filteredMonth

// 	if () {
// 		return {
// 			props: { hasError: true },
// 			// notFound: true,
// 			// redirect: {
// 			// 	destination:'/error'
// 			// }
// 		}
// 	}

// 	const filteredEvents = await getFilteredEvents({
// 		year: numYear,
// 		month: numMonth,
// 	})

// 	return {
// 		props: {
// 			events: filteredEvents,
// 			date: {
// 				year: numYear,
// 				month: numMonth,
// 			},
// 		},
// 	}
// }

export default FilteredEventsPage
