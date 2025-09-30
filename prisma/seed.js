// prisma/seed.js
import { PrismaClient } from '../src/generated/prisma/index.js'; // adjust path if needed
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // ----------------------
  // Users and Sessions
  // ----------------------
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        passwordHash: faker.internet.password(),
        sessions: {
          create: [
            {
              SessionToken: faker.string.uuid(),
              expires: faker.date.future(),
              requires2FA: faker.datatype.boolean(),
            },
          ],
        },
      },
    });
    users.push(user);
  }

  // ----------------------
  // Makes, Models, Variants
  // ----------------------
  const makes = [];
  for (let i = 0; i < 3; i++) {
    const make = await prisma.make.create({
      data: {
        name: faker.vehicle.manufacturer() + '-' + faker.string.alphanumeric({ length: 5 }),

        image: `https://loremflickr.com/640/480/car?random=${faker.number.int({ min: 1, max: 1000 })}`,
        models: {
          create: [
            {
              name: faker.vehicle.model(),
              variants: {
                create: [
                  {
                    name: faker.vehicle.model() + '-V1',
                    yearStart: faker.number.int({ min: 2010, max: 2015 }),
                    yearEnd: faker.number.int({ min: 2016, max: 2024 }),
                  },
                  {
                    name: faker.vehicle.model() + '-V2',
                    yearStart: faker.number.int({ min: 2015, max: 2018 }),
                    yearEnd: faker.number.int({ min: 2019, max: 2024 }),
                  },
                ],
              },
            },
          ],
        },
      },
    });
    makes.push(make);
  }

  // ----------------------
  // Cars
  // ----------------------
  const cars = [];
  for (let i = 0; i < 5; i++) {
    const car = await prisma.car.create({
      data: {
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.number.int({ min: 2000, max: 2025 }),
        price: faker.number.float({ min: 5000, max: 50000, precision: 0.01 }),
      },
    });
    cars.push(car);
  }

  // ----------------------
  // Sales
  // ----------------------
  for (let i = 0; i < 5; i++) {
    await prisma.sale.create({
      data: {
        carId: cars[i].id,
        customerName: faker.person.fullName(),
        salePrice: faker.number.float({ min: 5000, max: 50000, precision: 0.01 }),
      },
    });
  }

  // ----------------------
  // Classifieds, Images, Customers
  // ----------------------
  for (const make of makes) {
    const model = await prisma.model.findFirst({ where: { makeId: make.id } });
    const variant = await prisma.modelVariant.findFirst({ where: { modelId: model.id } });

    const classified = await prisma.classified.create({
      data: {
        title: `${make.name} ${model.name} ${variant.name}`,
        slug: `${make.name.toLowerCase().replace(/\s+/g, '-')}-${model.name.toLowerCase().replace(/\s+/g, '-')}-${variant.name.toLowerCase().replace(/\s+/g, '-')}`,
        year: faker.number.int({ min: 2005, max: 2025 }),
        makeId: make.id,
        modelId: model.id,
        modelVariantId: variant.id,
        transmission: 'MANUAL',
        colour: 'BLACK',
        fuelType: 'PETROL',
        bodyType: 'SEDAN',
        currency: 'KES',
        status: 'AVAILABLE',
      },
    });

    await prisma.image.create({
      data: {
        alt: 'Car image',
        src: `https://loremflickr.com/640/480/car?random=${faker.number.int({ min: 1, max: 1000 })}`,
        url: faker.internet.url(),
        classifiedId: classified.id,
        blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj',
        isMain: true,
      },
    });

    const customer = await prisma.customer.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+2547########'),
        classifiedId: classified.id,
        lifecycle: {
          create: [
            {
              oldstatus: 'SUBSCRIBER',
              newstatus: 'INTERESTED',
            },
          ],
        },
      },
    });
  }

  // ----------------------
  // PageViews
  // ----------------------
  for (let i = 0; i < 10; i++) {
    await prisma.pageView.create({
      data: {
        path: `/classified/${faker.word.sample()}`,
        viewedAt: faker.date.recent(),
        ipAddress: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
        Referrer: faker.internet.url(),
      },
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
