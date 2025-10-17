import { imageSources } from '@/config/constants';
import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';





export async function seedImages(prisma: PrismaClient) {
    const classifieds = await prisma.classified.findMany();
    const classifiedIds = classifieds.map((classified) => classified.id);

    for (const classifiedId of classifiedIds) {
        const image: Prisma.ImageCreateInput = {
            src: imageSources.classifiedPlaceholder,
            alt: faker.lorem.words({ min: 2, max: 5 }),
            url: faker.image.url(),
            caption: faker.lorem.sentence(),
            isMain: true,
            blurhash: "ZYkKDwT0fbhXmodll4iImYh42ASCnQAM",
            classified: {
                connect: {
                    id: classifiedId
                }
            }
        };

        await prisma.image.create({
            data: image
        });
    }
}