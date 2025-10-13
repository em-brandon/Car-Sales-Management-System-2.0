import {ClassifiedWithImages} from '@/config/types'

interface ClassifiedCardProps {
    classified: ClassifiedWithImages;
}

export const classifiedList = (props: ClassifiedCardProps) => {

    const {classified} = props;

    return <div className=" grid grid-cols-2 md frid-cols-3 xl:grid-cols-4 gap-4">
{}

</div>;

}