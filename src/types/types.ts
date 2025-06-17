// src/types/types.ts
export type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
};


export type ProductType =  {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  additionalImages?: string[];
  category: string;
  featured?: boolean;
  description?: string | undefined;
  material?: string;
  fit?: string;
  manufacturer?: string;
  origin?: string;
  reviews?: Review[];
};

export type ProductCollectionProps = {
  title: string;
  subtitle?: string;
  filterFn?: (product: ProductType) => boolean | undefined;
  maxItems?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
  gridCols?: string;

};