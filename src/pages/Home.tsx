import { useGetProductsQuery } from '../services/api';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';


const Home = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-12">Products</h1>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
      >
        {data?.map((product) => (
          <Card
            key={product.id}
          >
            <CardHeader>
              <img src={product.image} alt={product.title} className="aspect-square object-contain"/>
            </CardHeader>
            <CardContent>
              {product.title} • {product.price}€
            </CardContent>
            <CardFooter>
              <Link to={`/products/${product.id}`} className="w-full mr-2">
                <Button variant="outline" className="w-full">Voir le produit</Button>
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex">
                    <Button className="aspect-square p-2.5">
                      <ShoppingCart className="w-8 h-8"/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ajouter au panier</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;