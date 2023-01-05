/**
 * Any file inside the folder pages/api is mapped to /api/* and
 *  will be treated as an API endpoint instead of a page.
 * They are server-side only bundles and won't increase
 *  your client-side bundle size.
 *
 */
import { GraphQLClient, gql } from "graphql-request";
const graphqlAPI = process.env.HYGRAPH_PROJECT_API;


export default async function comments(req, res) {
  // const {name, email, slug, comment}=req.body;
  const graphQlClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

const result=await graphQlClient.request(query,req.body)
return res.status(200).send(result)
}
