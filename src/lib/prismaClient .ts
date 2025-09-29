import {PrismaClient} from "@prisma/client"; // Import the PrismaClient class from the Prisma client package


const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }; // Create a global variable to hold the Prisma client instance
 

function makeClient() { // Function to create a new Prisma client instance
return new PrismaClient({log: ['error', 'info', 'warn' ] });


}

export const prisma = globalForPrisma.prisma || makeClient(); 

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


// This ensures that the Prisma Client is a singleton in development mode, preventing multiple instances from being created during hot-reloading.
// In production, a new instance is created each time the server starts.
// This is important for performance and to avoid exhausting database connections.

//This allows us to use the prisma client throughout our application by importing it from this file. To querry the database with abstarction.
