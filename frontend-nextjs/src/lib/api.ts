const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    // Ensure endpoint starts with /api for API Gateway routing
    const formattedEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;

    // Attach JWT if present in localStorage
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
    };
    if (token && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${formattedEndpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        // Try to parse error body when available
        const text = await response.text().catch(() => '');
        let errorMsg = 'API request failed';
        try {
            const parsed = JSON.parse(text);
            errorMsg = parsed.message || JSON.stringify(parsed);
        } catch (e) {
            if (text) errorMsg = text;
        }
        throw new Error(errorMsg);
    }

    // When no content (204) return null
    if (response.status === 204) return null;
    return response.json();
}

export const authApi = {
    login: (credentials: any) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    signup: (data: any) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    me: () => apiFetch('/auth/me'),
};

export const productApi = {
    getProducts: () => apiFetch('/products'),
    getProduct: (id: string) => apiFetch(`/products/${id}`),
};

export const userApi = {
    getProfile: (email: string) => apiFetch(`/users/${email}`),
    getMyProfile: () => apiFetch('/users/me'),
    updateProfile: (data: any) => apiFetch('/users', { method: 'POST', body: JSON.stringify(data) }),
};

export const orderApi = {
    placeOrder: (data: any) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
    getUserOrders: (email: string) => apiFetch(`/orders/user/${email}`),
};

export const paymentApi = {
    processPayment: (data: any) => apiFetch('/payments', { method: 'POST', body: JSON.stringify(data) }),
};

export const cartApi = {
    getCart: () => apiFetch('/cart'),
    addItem: (data: any) => apiFetch('/cart', { method: 'POST', body: JSON.stringify(data) }),
    removeItem: (productId: string) => apiFetch(`/cart/${productId}`, { method: 'DELETE' }),
    clearCart: () => apiFetch('/cart/clear', { method: 'POST' }),
};
