"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  image?: string;
}

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const data = await db.posts.get(id);
      if (!data) {
        setPost(null);
      } else {
        setPost(data as BlogPost);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center text-muted-foreground">
        Loading post...
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="px-4 mx-auto max-w-2xl py-16">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to blog
      </Link>

      <Card className="p-6">
        <h1 className="mb-4 text-3xl font-bold">{post?.title}</h1>
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>By {post?.author}</span>
          <span>• {new Date(post?.createdAt).toLocaleDateString()}</span>
          <Badge>{post?.category}</Badge>
        </div>

        <Image
          src={
            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
          }
          alt={post.title}
          width={0}
          height={0}
          className="mb-6 w-full h-[300px] rounded-lg object-cover"
        />

        <article className="prose max-w-none">
          <ReactMarkdown>{post?.content || ""}</ReactMarkdown>
        </article>
      </Card>
    </div>
  );
}
