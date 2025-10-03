"use client";

import { useWizardStore } from "@/store/useWizardStore";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface Step4Props {
  setOpen: (open: boolean) => void;
}

export default function Step4({ setOpen }: Step4Props) {
  const data = useWizardStore((s) => s.data);
  const back = useWizardStore((s) => s.back);
  const reset = useWizardStore((s) => s.reset);
  const router = useRouter();

  async function submit() {
    const allowedCategories = ["Tech", "Lifestyle", "Business"] as const;
    type Category = (typeof allowedCategories)[number];

    const post = {
      id: nanoid(),
      title: data.title || "",
      author: data.author || "",
      summary: data.summary || "",
      category: allowedCategories.includes(data.category as Category)
        ? (data.category as Category)
        : "Tech",
      content: data.content || "",
      createdAt: new Date().toISOString(),
    };

    await db.posts.add(post);

    reset();
    router.push("/");
    toast.success("Post created successfully");
    setOpen(false);
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">Review</h3>
      <div className="space-y-2 mt-4">
        <p>
          <strong>Title:</strong> {data.title}
        </p>
        <p>
          <strong>Author:</strong> {data.author}
        </p>
        <p>
          <strong>Category:</strong> {data.category}
        </p>
        <p>
          <strong>Summary:</strong> {data.summary}
        </p>
        <div>
          <strong>Content:</strong>
          <div className="mt-2 p-3 max-h-[200px] overflow-y-auto bg-gray-50 border rounded whitespace-pre-wrap">
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button
          onClick={back}
          variant={"outline"}
          className="px-4 py-2 border rounded"
        >
          Back
        </Button>
        <Button onClick={submit} className="px-4 py-2 text-white rounded">
          Submit
        </Button>
      </div>
    </div>
  );
}
