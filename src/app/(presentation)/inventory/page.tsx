import { ClassifiedCard } from "@/components/inventory/classified-card";
import {Classifiedslist } from "@/components/inventory/classified-list";
import type { AwaitedPageProps, PageProps } from "@/config/types";
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

  console.log({ classifieds });

  const count = await prisma.classified.count();

  return (
    <>
      < Classifiedslist  classifieds={classifieds} />
    </>
  )
  
}