import {useRouter} from 'next/router'

const SelectedClientProjectPage = () => {
    const router = useRouter()
    console.log(router.query)
	return (
		<div>
			<h1>
				This is project page for a specific project page for a specifec
				client
			</h1>
		</div>
	)
}

export default SelectedClientProjectPage
