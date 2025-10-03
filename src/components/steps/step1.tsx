"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1Schema } from "@/lib/schemas";
import { useWizardStore } from "@/store/useWizardStore";
import z from "zod";
import { Button } from "@/components/ui/button";

type Form = z.infer<typeof Step1Schema>;

export default function Step1() {
  const setData = useWizardStore((s) => s.setData);
  const next = useWizardStore((s) => s.next);
  const data = useWizardStore((s) => s.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(Step1Schema),
    defaultValues: {
      title: data?.title ?? "",
      author: data?.author ?? "",
    },
  });

  function onSubmit(values: Form) {
    setData(values);
    next();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        {...register("title")}
        aria-invalid={!!errors.title}
        className="w-full border p-2 rounded"
        error={errors?.title?.message}
        required
      />
      <Input
        label="Author"
        {...register("author")}
        aria-invalid={!!errors.author}
        className="w-full border p-2 rounded"
        error={errors?.author?.message}
        required
      />
      <div className="flex justify-end">
        <Button type="submit" className="px-4 py-2 text-white rounded">
          Next
        </Button>
      </div>
    </form>
  );
}
