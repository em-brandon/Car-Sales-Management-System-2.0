const {PrismaClient} = require ('@prisma/client')

const prisma = new PrismaClient()

async function main() { // Main function to execute the seeding script
    console.log(`Start seeding ...`) // Log the start of the seeding process

}

 



// Call the main function to execute the script
main().catch((e) => {
    throw e // Rethrow any errors that occur during execution
}).finally(async () => { // Ensure the Prisma Client disconnects from the database
    await prisma.$disconnect ()
})
