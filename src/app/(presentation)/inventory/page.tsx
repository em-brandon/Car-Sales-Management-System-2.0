import type { PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";

export default async function InventoryPage({ searchParams }: PageProps) {
  // Example: extract query params (like ?q=car)
  const query = searchParams?.q || "";

  // Get all classifieds that match query
  const classifieds = await prisma.classified.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  // Count all classifieds
  const count = await prisma.classified.count();

  return (
    <main>
      <h1>Inventory Page</h1>
      <p>Total classifieds: {count}</p>
      <ul>
        {classifieds.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </main>
  );
}
