import type { AwaitedPageProps, PageProps } from '@/config/types';
import { prisma } from "@/lib/prisma";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
    const searchParams =await props.searchParams;
    const classifieds = await getInventory(searchParams);
    const count = await prisma.calssified.count();
    
    return <h1>{count} </h1>



}