import { routes} from '@/config/routes'
import {Classified, Prisma} from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type ClassifiedWithImages = Prisma.ClassifiedCardGetPayload <{
    include: {
        images : true ;


    }


}>
interface ClassifiedCardProps {
    classified: <ClassifiedWithImages;
}

