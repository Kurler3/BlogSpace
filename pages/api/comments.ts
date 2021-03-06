// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next'

const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;


interface Data {
  name?: String;
  message?: String;
}

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    
    // CONNECT AND AUTHENTICATE TO THE GRAPHQLCLIENT
    const graphQLClient = new GraphQLClient(
      graphQLAPI!,
      {
        headers : {
          authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
      }
    );

    // CREATE THE QUERY
    const query = gql`
      mutation CreateComment($name:String!, $email:String!, $comment:String!, $slug:String!) {
        createComment(data: {name:$name, email:$email, comment:$comment, post: {connect: {slug:$slug}}}) {
          name
          email
          comment
        }
      }
    `;

    // MAKE REQUEST
    const result = await graphQLClient.request(query, req.body);


    return res.status(200).send(result);

  }
  catch (error) {
      console.log("Error submitting comment back-end: ", error);
      res.status(500).json({message: `${error}`});
  }
}
