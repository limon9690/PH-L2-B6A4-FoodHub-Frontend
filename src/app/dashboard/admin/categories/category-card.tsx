"use client"
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link';
import { DeleteCategoryDialogue } from './[id]/delete-category-dialogue';
import { deleteCategory } from '@/service/category.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export function CategoryCard({ category }) {
  const router = useRouter();
  const isDeleting = false;
  const handleDelete = async () => {
    const result = await deleteCategory(category.id);

    if (result?.error) {
      toast.error(result?.error?.message);
      return;
    }

    toast.success("Category deleted successfully!");
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border bg-background p-4 sm:flex-row sm:items-center">
      {/* Left: name + buttons */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="min-w-0">
          <p className="truncate text-base font-medium">{category.name}</p>
          <p className="text-sm text-muted-foreground">Category</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
            <Link href={`/dashboard/admin/categories/${category.id}`}>
              Edit
            </Link>
          </Button>

          <DeleteCategoryDialogue
            trigger={
              <Button
                variant="destructive"
                size="sm"
                className="gap-2 cursor-pointer"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            }
            onConfirm={handleDelete}
          />


        </div>
      </div>
    </div>

  )
}
