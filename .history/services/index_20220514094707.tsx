// USING GRAPHQL-REQUEST LIBRARY IS ENOUGH FOR SMALL APPS.
import { gql, request } from "graphql-request";
import { Category } from "../common/types";


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export const getPosts = async () => {

    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                node {
                    author {
                    bio
                    name
                    id
                    photo {
                            url
                    }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                        url
                    }
                    categories {
                    name
                    slug
                    }
                }
            }
            }
        }
    `;


    try {
        
        const results = await request(graphqlAPI, query);

        
        return results.postsConnection.edges;

    } catch (error) {
        console.log("Error: ", error);
        
    }

}


// GET RECENT POSTS
export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    try {
        
        const result = await request(graphqlAPI, query);

        return result.posts;

    } catch (error) {
        console.log("Error:", error);
        
    }
}

// GIVEN AN ARRAY OF CATEGORIES AND A SLUG (END POINT OF LINK)
// RETURN AN ARRAY OF RELATED POSTS
export const getRelatedPosts = async (categories: String[], slug: String) => {

    const query = gql`
        query GetRelatedPosts($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ) { 
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;


    try {
        
        const results = await request(graphqlAPI, query, {
            slug: slug,
            categories: categories,
        });


        return results.posts;

    } catch (error) {
        console.log("Error: ", error);
        
    }

}

// GET CATEGORIES!
export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;


    try {
        let result = await request(graphqlAPI, query);
        
        return result.categories;
    } catch (error) {
        console.log("Error Fetching categories: ", error);
                
    }
}




export const getPostDetails = async (slug:String) => {
    
    const query = gql`
        query GetPostDetails($slug: String) {
            posts(where: {slug: $slug}) {
                    author {
                        bio
                        name
                        id
                        photo {
                                url
                        }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                        url
                    }
                    categories {
                        name
                        slug
                    }
                    content {
                        raw
                    }
            }
        }
    `;


    try {
        
        const results = await request(graphqlAPI, query, {slug});

        
        return results.posts;

    } catch (error) {
        console.log("Error: ", error);
        
    }

}


// SUBMIT COMMENT FUNCTION
export const submitComment = async (comment: Comment) => {
    try {

        let params = {
            method: "POST", // DEFINE THE TYPE OF HTML REQUEST
            body: JSON.stringify(comment), // STRINGIFY THE COMMENT
        }

        const result = await fetch('/api/comments', params);


        
    } catch (error) {
        console.log("Error submitting comment: ", error);
        
    }
}