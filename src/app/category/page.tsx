// app/category/page.tsx
import { CategorySection } from '@/components/CategorySection';

export default function AllCategoriesPage() {
    return (
        <main className="max-w-5xl px-6 mx-auto mt-10">
            <h1 className="mb-6 text-3xl font-bold">All Categories</h1>
            <CategorySection />
        </main>
    );
}
