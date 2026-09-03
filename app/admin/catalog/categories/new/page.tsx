import { CategoryForm } from "../category-form";

export default function NewCategoryPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Category</h1>
      <CategoryForm />
    </div>
  );
}
