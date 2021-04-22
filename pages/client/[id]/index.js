import { useRouter } from 'next/router'

const ClientsProjectPage = () => {
	const router = useRouter()
	console.log(router.query)

	const loadProjectHandler = () => {
		router.push({
			pathname: '/client/[id]/[clientprojectid]',
			query: { id: 'max', clientprojectid: 'projectA' },
		})
	}
	return (
		<div>
			<h1>The projects of given client</h1>
			<button onClick={loadProjectHandler}>Load Project of A</button>
		</div>
	)
}

export default ClientsProjectPage
