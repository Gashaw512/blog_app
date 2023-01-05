import { request, gql } from "graphql-request";

const graphqlAPI = process.env.HYGRAPH_PROJECT_API;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdBy {
              id
            }
            slug
            title
            featuredImage {
              url
            }
            excerpt
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

// recent post
export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails(){
    posts(
      orderBy: createdAt_ASC
      last:3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
  }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

//similar post query
export const getSimilarPosts = async ({ categories, slug }) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
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
  const result = await request(graphqlAPI, query, { categories, slug });
  return result.posts;
};

// get categories query

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};

// get post details query
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdBy {
          id
        }
        slug
        title
        featuredImage {
          url
        }
        excerpt
        categories {
          name
          slug
        }
        content{
          raw
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

//
// export const submmitComment=async(obj)=>{
// // const result=
// }



export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

//get comments query

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
     comments(where: {post: {slug: $slug}}) {
      name
      createdAT
      comment
     }
    }
  `;

  const result = await request(graphqlAPI, query, {slug});
  return result.comments;
};

// get featured post query
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};