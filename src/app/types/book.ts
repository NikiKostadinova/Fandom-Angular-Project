import { Image } from "./image";
import { Comment } from "./comment";

export interface Book {
    _id: string;
    name: string;
    author: string;
    image: Image;
    published: string;
    genre: string;
    description: string;
    createdAt: string;
    rating: number;
    owner: string;
    // numberReviews: number;
    commentList: Comment[];
}

