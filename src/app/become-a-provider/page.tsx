"use client"

import * as React from "react"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useForm } from "@tanstack/react-form"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import Link from "next/link"
import { providerService } from "@/service/providers.service"
import { authClient } from "@/lib/auth-client"

const schema = z.object({
  shopName: z.string().min(3, "Shop name must be at least 3 characters."),
})

export default function BecomeProviderPage() {
  const router = useRouter()
  const {refetch} = authClient.useSession();

  const form = useForm({
    defaultValues: {
      shopName: "",
    }, 
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      const result = await providerService.createProvider(value);

      if (result.error) {
        if (result.error.code === "DUPLICATE_RESOURCE") {
          toast.error("Shop name is already taken. Try a different one!");
        }
      } else {
        toast("Congratulations! You are now a provider");
        await refetch();
        router.push('/providers');
        router.refresh();
      }
    },
  })

  return (
    <section className="container py-10">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Become a provider</CardTitle>
            <CardDescription>
              Create your kitchen profile. You can start adding meals right after.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              id="become-provider-form"
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              <FieldGroup>
                <form.Field
                  name="shopName"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Shop name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="e.g., John's Kitchen"
                          autoComplete="organization"
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />
              </FieldGroup>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={form.state.isSubmitting}
                >
                  {form.state.isSubmitting ? "Saving..." : "Become a provider"}
                </Button>
                
              </div>
              <Button asChild variant="outline" className="w-full">
                  <Link href="/">Cancel</Link>
                </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing, you agree to follow FoodHub’s provider guidelines.
        </p>
      </div>
    </section>
  )
}
