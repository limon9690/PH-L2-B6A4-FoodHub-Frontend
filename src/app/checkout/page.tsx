export const dynamic = "force-dynamic";

import { userService } from "@/service/user.service";
import { CheckoutComponent } from "./checkout-component";
import { getUserAddress } from "@/service/address.service";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {
    const userData = await userService.getUserDetails();

    console.log(userData);

    if (!userData?.id) {
        redirect("/login");
    }

    const addressData = await getUserAddress();

    const user = {
        name: userData.name,
        email: userData.email,
    };

    const address = {
        address: addressData?.address ?? "Add your address",
        phone: addressData?.phone ?? "Add your phone",
    };

    return (
        <section className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <CheckoutComponent
                user={user}
                address={address}
            />
        </section>
    );
};

export default CheckoutPage;
