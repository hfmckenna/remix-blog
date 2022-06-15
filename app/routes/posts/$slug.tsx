import { marked } from "marked";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getPost } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  const html = marked(post.markdown);
  return json({ post, html });
};

export default function PostRoute() {
  const { post, html } = useLoaderData();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </main>
  );
}
