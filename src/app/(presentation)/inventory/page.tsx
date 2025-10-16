import { Classifiedslist } from "@/components/inventory/classified-list";
import type { PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";

const getInventoryItems = async (
  searchParams: Record<string, string | string[] | undefined>
) => {
  return prisma.classified.findMany({
    include: {
      images: true,
    },
  });
};

export default async function InventoryPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const classifieds = await getInventoryItems(searchParams ?? {});

  return (
    <div className="px-4 py-6">
      <Classifiedslist classifieds={classifieds} />
    </div>
  );
}
