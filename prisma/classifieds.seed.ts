import { bodyType, colour, fuelType, Prisma, PrismaClient, QISJCompliant, transmission, ClassifiedStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'
import slugify from 'slugify';
import { prisma } from '@/lib/prisma';


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

    const year = faker.date.between({
        
        from: new Date (1925, 0 , 1 ),
        to: new Date(),
    }).getFullYear();

    const title = [year, make.name, model.name, variants?.[0]?.name].filter(Boolean).join (' ');

    const vrm = faker.vehicle.vrm();

    const baseSlug = slugify(`${title} ${vrm}`);

    classifiedsData.push({
        year,
        vrm,
        slug: baseSlug,
        makeId: make.id,
        modelId: model.id,
        ... (variants?.[0]?.id && {modelVariantId: variants[0].id}),
        title,
        price: faker.number.int ({min: 400000, max: 10000000}),
        odoReading: faker.number.int({min: 0, max: 300000}),
        odoUnit: faker.helpers.arrayElement(['km', 'mi']),
        bodyType: faker.helpers.arrayElement( Object.values(bodyType)),
        transmission: faker.helpers.arrayElement( Object.values(transmission)),
        fuelType: faker.helpers.arrayElement( Object.values(fuelType)),
        colour: faker.helpers.arrayElement( Object.values(colour)),
        QisjCompliant: faker.helpers.arrayElement (Object.values(QISJCompliant)),
        status: faker.helpers.arrayElement(Object.values(ClassifiedStatus))
    });
}

const result = await prisma.classified.createMany({
    data : classifiedsData,
    skipDuplicates: true,
});

console.log(`Seeded ${result.count} classifieds.`);
}