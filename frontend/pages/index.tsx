import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, PostWidget, Categories } from "../components";

const posts = [
  {
    title: "Mern Stack web development",
    excerpt: "Road Map for learning to be Full stack developer",
  },
  {
    title: "Vue JS",
    excerpt: "Road Map for learning to be Full stack developer",
  },
  {
    title: "React JS",
    excerpt: "Road Map for learning to be Full stack developer",
  },
  {
    title: "Node Js",
    excerpt: "Road Map for learning to be Full stack developer",
  },
  {
    title: "Express JS",
    excerpt: "Road Map for learning to be Full stack developer",
  },
];
const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8 bg-gray-300">
      <Head>
        <title>G-Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relatve top-8">
            <PostWidget/>
            <Categories/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
