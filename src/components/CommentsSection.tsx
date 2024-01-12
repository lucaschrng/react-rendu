import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Button } from '../components/ui/button';
import { PenBox } from 'lucide-react';
import { CommentDialog } from '../components/CommentDialog';
import { useGetProductCommentsQuery } from '../../src/services/api';
import { useState } from 'react';

type CommentsSectionProps = {
  id: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ id }) => {
  const { data: comments, error, isLoading } = useGetProductCommentsQuery(id);

  const [open, showDialog] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      <div className="w-full p-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Commentaires</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="p-1 aspect-square h-8 w-8"
                  onClick={() => showDialog(true)}
                >
                  <PenBox size={16}/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rédiger un commentaire</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-4 grid gap-4">
          {comments?.map((comment, index) => (
            <div key={index} className="border border-neutral-300 rounded shadow-sm p-4">
              <p className="text-sm text-muted-foreground font-semibold">{comment.username}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <CommentDialog id={id} open={open} showDialog={showDialog}/>
    </>
  );
};

export default CommentsSection;