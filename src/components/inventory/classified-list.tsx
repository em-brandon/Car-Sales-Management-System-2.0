import type { ClassifiedWithImages } from "@/config/types";
import { ClassifiedCard } from "./classified-card";

interface ClassifiedslistProps { 
    classifieds: ClassifiedWithImages[];

}

export const Classifiedslist = ( props: ClassifiedslistProps)  => {

    const { classifieds } = props;

    return ( 
        <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-4">
            {classifieds.map((classified) => {
                return <ClassifiedCard key={classified.id} classified={classified} />;
            })}

            </div>

        );
};