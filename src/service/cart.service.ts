export const cartService = {
    getCartItems: () => {
        const cartItems = localStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : [];
    },

    saveCartItems: (cartItem) => {
        localStorage.setItem('cartItems', JSON.stringify(cartItem));
    },

    addToCart: (product) => {
        let cartItems = cartService.getCartItems();
        const existingProduct = cartItems.findIndex(item => item.id === product.id);

        if (existingProduct > -1) {
            cartItems[existingProduct].quantity += 1
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        cartService.saveCartItems(cartItems);
    },

    removeFromCart: (productId) => {
        const cartItems = cartService
            .getCartItems()
            .filter((item) => item.id !== productId);

        cartService.saveCartItems(cartItems);
    },

    clearCart: () => {
        localStorage.removeItem('cartItem');
        cartService.saveCartItems([]);
    }
}