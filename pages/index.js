import Link from 'next/link'
const HomePage = () => {
	return (
		<div>
			<h1>This is Home Page</h1>
			<ul>
				<li>
					<Link href='/portfolio'>Portfolio</Link>
				</li>
				<li>
					<Link href='/client'>Client</Link>
				</li>
				<li>
					<Link href='/blog/slug'>Blog</Link>
				</li>
				<li>
					<Link href='/about'>About</Link>
				</li>
			</ul>
		</div>
	)
}

export default HomePage
