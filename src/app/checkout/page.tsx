import { userService } from "@/client-service/user.service";
import { CheckoutComponent } from "./checkout-component";
import { addressService } from "@/client-service/address.service";

const CheckoutPage = async () => {
    const userData = await userService.getUserDetails();
    

    const addressData = await userService.getUserAddress(userData.id);


    // mock data for now (replace later)
    const user = {
        name: userData.name,
        email: userData.email,
    };

    const address = {
        address: addressData.address,
        phone: addressData.phone
    };

    const total = 46.0;

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
