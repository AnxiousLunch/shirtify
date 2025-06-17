
import ProductCollection from './ProductCollection';
// import { ProductType } from '../types/types';


const FeaturedProducts = () => {
  return (
    <ProductCollection
      title="Featured Products"
      subtitle="Discover our most popular custom shirts"
      filterFn={(product) => product.featured}
      maxItems={6}
      showViewAll={true}
      viewAllLink="/collections"
    />
  );
};

export default FeaturedProducts;