'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { addressService } from "@/service/address.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { providerService } from "@/service/providers.service";

const addressSchema = z.object({
    address: z.string().min(1, "Address is required."),
    phone: z.string().min(7, "Enter a valid phone number."),
});

const shopSchema = z.object({
    shopName: z.string().min(1, "Shop name is required."),
});


export default function ProfilePage() {
    const [editing, setEditing] = React.useState(false);
    const [editingShop, setEditingShop] = React.useState(false);

    const [data, setData] = React.useState({
        address: "",
        phone: "",
    });

    const [providerData, setProviderData] = React.useState({
        shopName: ""
    });

    const { data: session } = authClient.useSession();
    const router = useRouter();

    const user = session?.user;

    React.useEffect(() => {
        const load = async () => {
            const getAddress = await addressService.getUserAddress();
            setData({
                address: getAddress?.address ?? "",
                phone: getAddress?.phone ?? "",
            });


            if (user?.role === "PROVIDER") {
                const getProviderData = await providerService.getSingleProviderByUserId();
                setProviderData({
                    shopName: getProviderData?.shopName ?? ""
                });
                // console.log(getProviderData)
            }
        };
        load();
    }, [user?.role]);


    const form = useForm({
        defaultValues: {
            address: "",
            phone: ""
        },
        validators: {
            onSubmit: addressSchema,
        },
        onSubmit: async ({ value }) => {
            const result = await addressService.createAddress(value);

            if (result.error) {
                toast.error(result?.error?.message);
                return;
            }
            toast.success("Address updated. Refresh to see the changes!");
            router.refresh();


            setEditing(false);
        },
    });

    const shopForm = useForm({
        defaultValues: {
            shopName: ""
        },
        validators: {
            onSubmit: shopSchema,
        },
        onSubmit: async ({ value }) => {
            // const result = await providerService.getSingleProviderByUserId();

            // if (result.error) {
            //     toast.error(result?.error?.message);
            //     return;
            // }
            // toast.success("Shop name updated. Refresh to see the changes!");
            // router.refresh();


            // setEditing(false);
            // router.refresh();

            toast.info("Feature will be released soon!");
        },
    });

    const onEdit = () => {
        form.reset(data);
        setEditing(true);
    };

    const onCancel = () => {
        form.reset(data);
        setEditing(false);
    };

    const onEditShop = () => {
        shopForm.reset(providerData);
        setEditingShop(true);
    };

    const onCancelShop = () => {
        shopForm.reset(providerData);
        setEditingShop(false);
    };

    const handleUserInfoEdit = () => {
        toast.info("Editing feature will be released soon!");
    }

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-semibold">Profile</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your personal information
                </p>
            </div>

            {/* User details */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>User Details</CardTitle>
                        <CardDescription>Your account information</CardDescription>
                    </div>

                    <Button variant="outline" className="cursor-pointer" onClick={handleUserInfoEdit}>
                        Edit
                    </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">Name</div>
                            <div className="text-sm font-medium">{user?.name ?? "John Doe"}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">Email</div>
                            <div className="text-sm font-medium">{user?.email ?? "John@mail.com"}</div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">Password</div>
                            <div className="text-sm font-medium">••••••••</div>
                        </div>
                    </div>
                </CardContent>
            </Card>


            {/* Address */}
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <CardTitle>Address</CardTitle>

                        {!editing ? (
                            <Button variant="outline" className="cursor-pointer" onClick={onEdit}>
                                Edit
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button type="submit" className="cursor-pointer" form="address-form" disabled={form.state.isSubmitting}>
                                    Save
                                </Button>
                                <Button variant="outline" className="cursor-pointer" onClick={onCancel}>
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </CardHeader>

                    <CardContent>
                        {!editing ? (
                            <div className="space-y-3 text-sm">
                                <div>
                                    <div className="text-muted-foreground">Address</div>
                                    <div className="font-medium">{data.address || "-"}</div>
                                </div>

                                <div>
                                    <div className="text-muted-foreground">Phone</div>
                                    <div className="font-medium">{data.phone || "-"}</div>
                                </div>
                            </div>
                        ) : (
                            <form
                                id="address-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    form.handleSubmit();
                                }}
                            >
                                <FieldGroup>
                                    <form.Field
                                        name="address"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                    />
                                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                                </Field>
                                            );
                                        }}
                                    />

                                    <form.Field
                                        name="phone"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                    />
                                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                                </Field>
                                            );
                                        }}
                                    />
                                </FieldGroup>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>

            {user?.role === "PROVIDER" && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <CardTitle>Provider Details</CardTitle>

                        {!editingShop ? (
                            <Button variant="outline" className="cursor-pointer" onClick={onEditShop}>
                                Edit
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                    form="shop-form"
                                    disabled={shopForm.state.isSubmitting}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={onCancelShop}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </CardHeader>

                    <CardContent>
                        {!editingShop ? (
                            <div className="space-y-3 text-sm">
                                <div>
                                    <div className="text-muted-foreground">Shop name</div>
                                    <div className="font-medium">{providerData.shopName || "-"}</div>
                                </div>
                            </div>
                        ) : (
                            <form
                                id="shop-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    shopForm.handleSubmit();
                                }}
                            >
                                <FieldGroup>
                                    <shopForm.Field
                                        name="shopName"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;

                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Shop name</FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                        placeholder="e.g. Mama's Kitchen"
                                                    />
                                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                                </Field>
                                            );
                                        }}
                                    />
                                </FieldGroup>
                            </form>
                        )}
                    </CardContent>
                </Card>
            )}

        </div>
    );
}
