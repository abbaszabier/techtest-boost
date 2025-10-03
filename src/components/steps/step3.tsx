"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step3Schema } from "@/lib/schemas";
import { useWizardStore } from "@/store/useWizardStore";
import z from "zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import "easymde/dist/easymde.min.css";

type Form = z.infer<typeof Step3Schema>;

export default function Step3() {
  const setData = useWizardStore((s) => s.setData);
  const next = useWizardStore((s) => s.next);
  const back = useWizardStore((s) => s.back);
  const data = useWizardStore((s) => s.data);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(Step3Schema),
    defaultValues: {
      content: data.content ?? "",
    },
  });

  function onSubmit(values: Form) {
    setData(values);
    next();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-foreground mb-2">
          Content
        </label>
        <SimpleMDE
          value={data.content || ""}
          onChange={(val) => setValue("content", val, { shouldValidate: true })}
          className="max-w-[470px] overflow-x-auto"
        />
        {errors.content && (
          <p className="text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          variant={"outline"}
          onClick={back}
          className="px-4 py-2 border rounded"
        >
          Back
        </Button>
        <Button type="submit" className="px-4 py-2 text-white rounded">
          Next
        </Button>
      </div>
    </form>
  );
}
