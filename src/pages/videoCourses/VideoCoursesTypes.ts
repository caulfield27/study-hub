
export interface ICourse{
    id: number;
    poster: string;
    name: string;
    author: string;
    description: string;
    reviews_count: number;
    rating_avg: number;
    language: 'en' | 'ru';
    duration: number;
    is_free: boolean;
    price: number | null;
}