import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting full database seed...');

  // =======================
  // USERS & SESSIONS
  // =======================
  const users = [];
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        passwordHash: faker.internet.password(),
      },
    });
    users.push(user);

    await prisma.session.create({
      data: {
        SessionToken: faker.string.uuid(),
        userId: user.id,
        expires: faker.date.future(),
        requires2FA: faker.datatype.boolean(),
      },
    });
  }

  // =======================
  // MAKES & MODELS
  // =======================
  const makes = [];
  for (let i = 0; i < 20; i++) {
    const make = await prisma.make.create({
      data: {
        name: faker.vehicle.manufacturer() + ' ' + i,
        image: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
      },
    });
    makes.push(make);

    // Create related models for each make
    for (let j = 0; j < 2; j++) {
      const model = await prisma.model.create({
        data: {
          name: faker.vehicle.model(),
          makeId: make.id,
        },
      });

      // Create model variants
      await prisma.modelVariant.create({
        data: {
          name: `${model.name} Variant ${j + 1}`,
          modelId: model.id,
          yearStart: faker.number.int({ min: 2000, max: 2020 }),
          yearEnd: faker.number.int({ min: 2021, max: 2025 }),
        },
      });
    }
  }

  // =======================
  // CLASSIFIEDS
  // =======================
  const allModels = await prisma.model.findMany();
  const allVariants = await prisma.modelVariant.findMany();

  const classifieds = [];
  for (let i = 0; i < 20; i++) {
    const model = faker.helpers.arrayElement(allModels);
    const variant = faker.helpers.arrayElement(allVariants);
    const makeId = model.makeId;

    const classified = await prisma.classified.create({
      data: {
        title: `${faker.vehicle.manufacturer()} ${faker.vehicle.model()}`,
        slug: faker.lorem.slug(),
        year: faker.number.int({ min: 2005, max: 2025 }),
        price: BigInt(faker.number.int({ min: 500000, max: 8000000 })),
        makeId,
        modelId: model.id,
        modelVariantId: variant.id,
        transmission: faker.helpers.arrayElement(['MANUAL', 'AUTOMATIC']),
        colour: faker.helpers.arrayElement([
          'BLACK',
          'WHITE',
          'RED',
          'BLUE',
          'SILVER',
          'GREY',
          'GREEN',
        ]),
        fuelType: faker.helpers.arrayElement(['PETROL', 'DIESEL', 'HYBRID']),
        bodyType: faker.helpers.arrayElement(['SEDAN', 'SUV', 'TRUCK']),
        currency: 'KES',
        status: faker.helpers.arrayElement(['AVAILABLE', 'SOLD', 'PENDING']),
      },
    });
    classifieds.push(classified);
  }

  // =======================
  // IMAGES
  // =======================
  for (const classified of classifieds) {
    for (let i = 0; i < 2; i++) {
      await prisma.image.create({
        data: {
          alt: faker.vehicle.model(),
          src: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
          url: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
          caption: faker.lorem.words(3),
          classifiedId: classified.id,
          blurhash: faker.string.alphanumeric(20),
          isMain: i === 0,
        },
      });
    }
  }

  // =======================
  // CUSTOMERS & SALES
  // =======================
  const customers = [];
  for (const classified of classifieds.slice(0, 10)) {
    const customer = await prisma.customer.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        classifiedId: classified.id,
      },
    });
    customers.push(customer);

    await prisma.customerLifeCycle.create({
      data: {
        customerId: customer.id,
        oldstatus: 'SUBSCRIBER',
        newstatus: 'CONTACTED',
      },
    });
  }

  for (let i = 0; i < 20; i++) {
    const car = await prisma.car.create({
      data: {
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.number.int({ min: 2000, max: 2025 }),
        price: faker.number.float({ min: 500000, max: 8000000 }),
      },
    });

    await prisma.sale.create({
      data: {
        carId: car.id,
        customerName: faker.person.fullName(),
        salePrice: faker.number.float({ min: 500000, max: 8000000 }),
      },
    });
  }

  // =======================
  // PAGE VIEWS
  // =======================
  for (let i = 0; i < 20; i++) {
    await prisma.pageView.create({
      data: {
        path: faker.internet.url(),
        ipAddress: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
        Referrer: faker.internet.url(),
      },
    });
  }

  console.log('✅ Database seeded with 20 records per table.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
