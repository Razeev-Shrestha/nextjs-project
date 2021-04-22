import Link from 'next/link'
const ClientsPage = () => {
	const clients = [
		{
			id: 'manu',
			name: 'manu',
		},
		{
			id: 'max',
			name: 'maxim',
		},
	]
	return (
		<div>
			<h1>This is clients Page</h1>
			<ul>
				{clients.map((client) => (
					<li key={client.id}>
						<Link href={{
							pathname: '/client/[id]',
							query:{id:client.id}
						}}>{client.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ClientsPage
