"use client";
import { useMemo, useState } from "react";
import { ArrowRight, Heart, LayoutGrid, List } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import FloatingButton from "@/components/common/floating-button";
import { db } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { SelectCustom, SelectItem } from "@/components/ui/select-custom";

const Home = () => {
  const posts = useLiveQuery(() => db.posts.toArray(), []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [layout, setLayout] = useState<"card" | "list">("card");

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts
      .filter((post) => {
        const matchSearch = post.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchCategory = category === "all" || post.category === category;
        return matchSearch && matchCategory;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [posts, search, category]);

  return (
    <>
      <section className="py-24">
        <div className="container mx-auto flex flex-col items-center gap-8 lg:px-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6">
              Latest Updates
            </Badge>
            <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              Blog List
            </h2>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
              Discover the latest blogs created using our wizard. You can read,
              explore, and get inspired. Created with{" "}
              <Heart className="inline-block w-4 h-4 text-red-500 mr-1" />
              by Abbas Zabier
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SelectCustom
                label=""
                placeholder="Filter by Category"
                value={category}
                onValueChange={setCategory}
              >
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectCustom>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={layout === "card" ? "default" : "outline"}
                size="icon"
                onClick={() => setLayout("card")}
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button
                variant={layout === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setLayout("list")}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {!posts ? (
            <p className="text-center text-muted-foreground">
              Loading posts...
            </p>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-muted-foreground">
                Data not found
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-muted-foreground">
                No results for search/filter
              </p>
            </div>
          ) : layout === "card" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {filteredPosts?.map((post) => (
                <Card
                  key={post.id}
                  className="grid grid-rows-[auto_auto_1fr_auto] gap-3 pt-0"
                >
                  <div className="aspect-16/9 w-full">
                    <Link
                      href={`/posts/${post.id}`}
                      className="transition-opacity duration-200 hover:opacity-70"
                    >
                      <Image
                        src={
                          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                        }
                        alt={post.title}
                        width={0}
                        height={0}
                        className="h-[200px] w-[402px] object-cover object-center rounded-t-lg"
                      />
                    </Link>
                    <div className="flex items-center justify-between px-6 mt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.author}</span> •
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Badge>{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <h3 className="text-lg font-semibold hover:underline md:text-xl">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </h3>
                  </CardHeader>
                  <CardContent className="gap-4">
                    <p className="text-sm text-muted-foreground">
                      {post.summary}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/posts/${post.id}`}
                      className="flex items-center text-foreground hover:underline"
                    >
                      Read more
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6 w-full">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold hover:underline">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{post.author}</span> •{" "}
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <Badge>{post.category}</Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">{post.summary}</p>
                  </div>
                  <Link
                    href={`/posts/${post.id}`}
                    className="flex items-center text-foreground hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <FloatingButton />
    </>
  );
};

export default Home;
