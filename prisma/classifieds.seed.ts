
import { faker } from '@faker-js/faker'
import slugify from 'slug';

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
        
        from: new Date (1925, 0 , 1 )
        to: new Date(),
    }).getFullYear();

    const tiltle = [year, make.name, model.name, variants?.name].filter(Boolean).join (' ');

    const vrm = faker.vehicle.vrm();

    const baseSlug = slugify(`${tiltle} ${vrm}`);

    classifiedsData.push({
        year,
        vrm,
        slug: baseSlug,
        makeId: make.id,
        modelId: model.id,
        ... (variants?.id && {modelVariantId: variants.id}),
        title,
        price: faker.number.int ({min: 400000, max: 10000000}),
        currency: CurrencyCode.USD,
        odoUnit: faker.helpers.arrayElement(Object.values(OdoUnit)),
        