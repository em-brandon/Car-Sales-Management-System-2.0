import type { Prisma,  PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker'

export async function seedClassifieds(prisma: PrismaClient ) {
    const makes = await prisma.make.findMany({
    include : {
        models: {
            include: {
                variants: true,
            },
        },
    },
    
});

const classifiedsData: Prisma.ClassifiedCreateManyInput[] = [];

for ( let i = 0; i < 25 ; i++) {
    const make = faker.helpers.arrayElement(makes);
    if (!make.models.length) continue; 
    const model = faker.helpers.arrayElement(make.models);
    const variants = model.variants.length ? faker.helpers.arrayElements(model.variants) : null;


    console.log({make, model, variants});

}

}

