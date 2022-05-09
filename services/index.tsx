// USING GRAPHQL-REQUEST LIBRARY IS ENOUGH FOR SMALL APPS.
import { gql, request } from "graphql-request";


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