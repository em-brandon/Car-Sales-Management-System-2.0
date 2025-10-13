type Params = {

   [x: string]: string | string[] ;


}


export type PageProps = {

    params?: Promise<Params>;
    searchParams?: Promise <{[x: string ]: string | string | undefined}>;
}

export type AwaitedPageProps = {
    params? : Awaited<PageProps['params']>;
    search? : Awaited<PageProps['searchParams']>;
}

export interface Image {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  alt: string;
  src: string;
  url: string;
  caption: string | null;
  classifiedId: number;
  blurhash: string;
  isMain: boolean;
}

export interface ClassifiedWithImages {
  id: number;
  title: string;
  price: bigint;
  year: number;
  odoReading: number;
  images: Image[];
  // Add other fields as needed
}

