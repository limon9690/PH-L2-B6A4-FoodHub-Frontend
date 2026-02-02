"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { createCategory } from "@/service/category.service";


const categorySchema = z.object({
  name: z
    .string()
    .min(4, "Name is required.")
    .max(50, "Max 50 characters."),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CreateCategoryForm({
  submitLabel = "Create Category",
  initialValues,
}: {
  submitLabel?: string;
  initialValues?: Partial<CategoryFormValues>;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: initialValues?.name ?? "",
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {

      const result = await createCategory(value);

      if (result?.error) {
        toast.error(result.error.message);
        return;
      }

      toast.success("Category saved successfully!");
      router.push("/dashboard/admin/categories");
      //router.refresh();
    },
  });

  const onCancel = () => {
    router.push("/dashboard/admin/categories");
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="name"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Indian, Chinese"
                aria-invalid={isInvalid}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="outline"
          className="cursor-pointer"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={form.state.isSubmitting}
          className="cursor-pointer"
        >
          {form.state.isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
