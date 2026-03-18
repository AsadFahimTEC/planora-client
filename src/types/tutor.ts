export interface Category {
    id: string;
    name: string;
}

export interface Tutor {
    id: string;
    bio: string;
    pricePerHr: number;
    rating: number;
    user: {
        name: string;
        email: string;
        image?: string;
    };
    categories: Category[];
}