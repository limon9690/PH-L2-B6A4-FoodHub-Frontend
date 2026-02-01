import { categoryService } from '@/service/category.service'
import { CategoryCard } from './category-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default async function CategoryPage() {
    const categories = await categoryService.getAllCategories();
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Manage Categories</h1>
                    <p className="text-sm text-muted-foreground">
                        Create, edit, or remove meal categories
                    </p>
                </div>

                <Button className="gap-2 cursor-pointer">
                    <Plus className="h-4 w-4" />
                    <Link href="/dashboard/admin/categories/create">
                    Add Category
                    </Link>
                </Button>
            </div>

            {/* Categories grid */}
            <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                    <CategoryCard
                        key={cat.id}
                        category={cat}
                    />
                ))}
            </div>
        </div>
    )
}
