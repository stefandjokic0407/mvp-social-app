import prisma from './client'
import {users} from './users'

async function seed() {
	for (let user of users) {
		await prisma.user.create({
			data: user
		})
	}
}

seed().catch(e => {
	console.log(e)
	process.exit(1)
}).finally(() => {
	prisma.$disconnect()
})
