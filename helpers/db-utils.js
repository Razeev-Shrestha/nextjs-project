import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.4clyz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
	)
	return client
}

export async function insertDocument(client, collection, document) {
	const db = client.db()
	const result = await db.collection(collection).insertOne(document)
	return result
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
	const db = client.db()
	const documents = await db
		.collection(collection)
		.find(filter)
		.sort(sort)
		.toArray()
	return documents
}
