import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateCommentMutation } from '../../src/services/api';

type CommentDialogProps = {
  id: string;
  open: boolean;
  showDialog: (open: boolean) => void;
}

type Inputs = {
  username: string;
  comment: string;
}

const CommentDialog: React.FC<CommentDialogProps> = ({ id, open, showDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>();

  const [createComment] = useCreateCommentMutation();

  const onOpenChange = (open: boolean) => {
    showDialog(open);
    reset();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createComment({ id: id ?? 0, ...data });
    showDialog(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rédiger un commentaire</DialogTitle>
          <DialogDescription>
            Envie de partager votre expérience avec ce produit ? Écrivez un commentaire !
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="uesrname" className="whitespace-nowrap">
                Nom Complet
              </Label>
              <Input
                id="username"
                placeholder="John Doe"
                {...register('username', { required: true })}
              />
              {errors.username && <span className="text-sm text-red-500">Ce champ est requis</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment" className="whitespace-nowrap">
                Commentaire
              </Label>
              <Textarea
                id="comment"
                placeholder="J'ai adoré ce produit !"
                {...register('comment', { required: true })}
              />
              {errors.comment && <span className="text-sm text-red-500">Ce champ est requis</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              Poster le commentaire
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CommentDialog };