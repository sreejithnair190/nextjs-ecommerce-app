import { UserForm } from "../user-form";

export default function NewUserPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Customer</h1>
      <UserForm />
    </div>
  );
}
