import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="aspect-square object-contain"/>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 my-1"/>
      </CardContent>
      <CardFooter>
        <div className="grid w-full gap-1">
          <Skeleton className="h-10"/>
          <div className="flex gap-1 p-1 rounded w-full justify-between">
            <div className="flex gap-1">
              <Skeleton className="aspect-square h-10"/>
              <Skeleton className="aspect-square h-10"/>
              <Skeleton className="aspect-square h-10"/>
            </div>
            <Skeleton className="aspect-square h-10"/>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;