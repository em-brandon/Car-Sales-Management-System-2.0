import type { ClassifiedWithImages } from "@/config/types";
import { ClassifiedCard } from "./classified-card";

interface ClassifiedslistProps {
  classifieds: ClassifiedWithImages[];
}

export const Classifiedslist = (props: ClassifiedslistProps) => {
  const { classifieds } = props;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {classifieds.map((classified) => (
        <ClassifiedCard key={classified.id} classified={classified} />
      ))}
    </div>
  );
};

export default Classifiedslist;
