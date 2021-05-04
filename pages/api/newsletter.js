import {connectDatabase,insertDocument} from '../../helpers/db-utils'

const newsletterHandler = async (req, res) => {
	if (req.method === 'POST') {
		const userEmail = req.body.email
		if (!userEmail || !userEmail.includes('@')) {
			res.status(422).json({ message: 'Invalid email Address.' })
			return
		}
		let client
		try {
			client = await connectDatabase()
		} catch (error) {
			res.status(500).json({ message: 'Connecting to the databse Failed' })
			return
		}
		try {
			await insertDocument(client,'emails', { email: userEmail })
			client.close()
		} catch (error) {
			res.status(500).json({ message: 'Inserting to the databse Failed' })
			return
		}

		res.status(201).json({ message: 'Signed Up' })
	}
}

export default newsletterHandler
