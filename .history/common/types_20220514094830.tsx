import { ParsedUrlQuery } from "querystring";

export interface Post {
    title: String;
    excerpt: String;
    author: {
        name: String;
        bio: String;
        id: number;
        photo: {
            url: String;
        };
    };
    createdAt: String;
    slug: String;
    featuredImage: {url:String};
    categories: {
        name: String;
        slug: String;
    }[];
    content: {
        raw: {
            children: [{
                children: [];
                type: String;
            }]
        };
    };
}

export interface Author {
    name: String;
    bio: String;
    id: number;
    photo: {
        url: String;
    };
}

export interface Category {
    name: String;
    slug: String;
}

export type NextGetStaticPropsCtx = {
	params?: {
		slug: string
	}
	preview?: boolean
	previewDate?: any
}

export type Comment = {
    name: String;
    comment: String;
    email: String;
}