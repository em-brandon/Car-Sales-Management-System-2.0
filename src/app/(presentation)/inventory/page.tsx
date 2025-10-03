import type { AwaitedPageProps, PageProps } from "@/config/types"
import { prisma } from "@/lib/prisma";

const getInventoryItems = async (
  searchParams: Record<string, string | string[] | undefined>
) => {
  return [];
};

export default async function InventoryPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const classifieds = await getInventoryItems(searchParams ?? {});

  console.log({ classifieds });

  const count = await prisma.classified.count();

  return <div className="grid grid-cols-1"><h1>{count}</h1>;
  
  </div>
}

