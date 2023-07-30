import { Image } from "./image";

export interface Book {
    _id: string;
    name: string;
    author: string;
    image: Image;
    published: number;
    genre: string;
    description: string;
    // rating: number;
    // numberReviews: number;
    // comments: string [];
}

