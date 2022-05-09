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
    }[]
}