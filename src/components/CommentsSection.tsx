import { Button } from './ui/button';
import { PenBox } from 'lucide-react';
import { CommentDialog } from './CommentDialog';
import { useGetProductCommentsQuery } from '../../src/services/api';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

type CommentsSectionProps = {
  id: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ id }) => {
  const { data: comments, error, isLoading } = useGetProductCommentsQuery(id);

  const [open, showDialog] = useState(false);

  if (error) return <div>Error</div>;

  if (isLoading) return (
    <div className="w-full p-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-1/3 my-1"/>
      </div>
      <div className="mt-4 grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="max-w-[560px] h-20"/>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Commentaires</h2>
          <Button
            variant="link"
            className="h-8 px-2"
            onClick={() => showDialog(true)}
          >
            <PenBox size={16} className="mr-2"/> Rédiger un commentaire
          </Button>
        </div>
        <div className="mt-4 grid gap-4">
          {comments?.map((comment, index) => (
            <div key={index} className="max-w-[560px] border border-neutral-300 rounded shadow-sm p-4">
              <p className="text-sm text-muted-foreground font-semibold">{comment.username}</p>
              <p style={{ wordWrap: 'break-word' }}>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <CommentDialog id={id} open={open} showDialog={showDialog}/>
    </>
  );
};

export default CommentsSection;