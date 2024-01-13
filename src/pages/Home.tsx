import { useGetProductsQuery } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';


const Home = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-12">Products</h1>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
      >
        {isLoading ? Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index}/>
        )) : data?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;