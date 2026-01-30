"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { categoryService } from "@/service/category.service";
import { mealService } from "@/service/meal.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const mealSchema = z.object({
    name: z.string().min(1, "Name is required."),
    details: z.string().min(1, "Details are required."),
    price: z.number().positive("Price must be greater than 0."),
    categoryId: z.string().min(1, "Category is required."),
    image_url: z.string().optional(),
    isAvailable: z.boolean().optional(),
});

export type MealFormValues = z.infer<typeof mealSchema>;

export function UpdateMealForm({
    submitLabel,
    initialValues,
    mealId
}: {
    submitLabel?: string;
    // onSubmit: (values: MealFormValues) => void;
    initialValues?: Partial<MealFormValues>;
    mealId : string
}) {
  const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: initialValues?.name ?? "",
            details: initialValues?.details ?? "",
            price: initialValues?.price ?? 0,
            categoryId: initialValues?.categoryId ?? "",
            image_url: initialValues?.image_url ?? "",
            isAvailable: initialValues?.isAvailable ?? true,
        },
        validators: {
            onSubmit: mealSchema,
        },
        onSubmit: async ({ value }) => {
            const result = await mealService.updateMeal(value, mealId);

            if (result?.error) {
              toast.error(result?.error?.message);
              return;
            }

            toast.success("Meal updated successfully!");
            router.push('/dashboard/provider/menu');
        },
    });

    const onCancel = () => {
      router.push('/dashboard/provider/menu');
    }

    const [categories, setCategory] = React.useState([]);

    React.useEffect(() => {
        const load = async () => {
            const categoryData = await categoryService.getAllCategories();
            setCategory(categoryData)
        }
        load();
    }, [])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
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
                                placeholder={initialValues?.name}
                                aria-invalid={isInvalid}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    );
                }}
            />

            <form.Field
                name="details"
                children={(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                            <Textarea
                                id={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder={initialValues?.details}
                                aria-invalid={isInvalid}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    );
                }}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <form.Field
                    name="price"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid;

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                                <Input
                                    id={field.name}
                                    type="number"
                                    value={String(field.state.value ?? "")}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        field.handleChange(v === "" ? 0 : Number(v));
                                    }}
                                    placeholder="25"
                                    aria-invalid={isInvalid}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                />

                <form.Field
                    name="categoryId"
                    children={(field) => {
                        const isInvalid =
                            field.state.meta.isTouched && !field.state.meta.isValid;

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel>Category</FieldLabel>
                                <Select
                                    value={field.state.value}
                                    onValueChange={(v) => field.handleChange(v)}
                                >
                                    <SelectTrigger aria-invalid={isInvalid}>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((c) => (
                                            <SelectItem key={c.id} value={c.id}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                />
            </div>

            <form.Field
                name="image_url"
                children={(field) => {
                    const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                        <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                            <Input
                                id={field.name}
                                value={field.state.value ?? ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                aria-invalid={isInvalid}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                    );
                }}
            />

            <Card className="p-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-sm font-medium">Available</div>
                        <div className="text-sm text-muted-foreground">
                            Toggle meal availability
                        </div>
                    </div>

                    <form.Field
                        name="isAvailable"
                        children={(field) => (
                            <Switch
                                checked={field.state.value}
                                onCheckedChange={(v) => field.handleChange(v)}
                            />
                        )}
                    />
                </div>
            </Card>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" className="cursor-pointer" type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={form.state.isSubmitting} className="cursor-pointer">
                    {submitLabel}
                </Button>
            </div>
        </form>

    );
}
