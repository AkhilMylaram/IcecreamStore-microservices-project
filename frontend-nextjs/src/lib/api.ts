const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    // Ensure endpoint starts with /api for API Gateway routing
    const formattedEndpoint = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    
    const response = await fetch(`${API_URL}${formattedEndpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
}

export const authApi = {
    login: (credentials: any) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    signup: (data: any) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
};

export const productApi = {
    getProducts: () => apiFetch('/products'),
    getProduct: (id: string) => apiFetch(`/products/${id}`),
};

export const userApi = {
    getProfile: (email: string) => apiFetch(`/users/${email}`),
    updateProfile: (data: any) => apiFetch('/users', { method: 'POST', body: JSON.stringify(data) }),
};

export const orderApi = {
    placeOrder: (data: any) => apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) }),
    getUserOrders: (email: string) => apiFetch(`/orders/user/${email}`),
};

export const paymentApi = {
    processPayment: (data: any) => apiFetch('/payments', { method: 'POST', body: JSON.stringify(data) }),
};
