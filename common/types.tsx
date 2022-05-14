import { ParsedUrlQuery } from "querystring";

export interface Post {
    title: string;
    excerpt: string;
    author: {
        name: string;
        bio: string;
        id: number;
        photo: {
            url: string;
        };
    };
    createdAt: String;
    slug: string;
    featuredImage: {url:string};
    categories: {
        name: string;
        slug: string;
    }[];
    content: {
        raw: {
            children: [{
                children: [];
                type: string;
            }]
        };
    };
}

export interface Author {
    name: string;
    bio: string;
    id: number;
    photo: {
        url: string;
    };
}

export interface Category {
    name: string;
    slug: string;
}

export type NextGetStaticPropsCtx = {
	params?: {
		slug: string
	}
	preview?: boolean
	previewDate?: any
}

export type Comment = {
    name: string;
    comment: string;
    email:  string;
    createdAt: string;
}