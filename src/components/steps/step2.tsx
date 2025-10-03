"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2Schema } from "@/lib/schemas";
import { useWizardStore } from "@/store/useWizardStore";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectCustom, SelectItem } from "@/components/ui/select-custom";

type Form = z.infer<typeof Step2Schema>;

export default function Step2() {
  const setData = useWizardStore((s) => s.setData);
  const next = useWizardStore((s) => s.next);
  const back = useWizardStore((s) => s.back);
  const data = useWizardStore((s) => s.data);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      summary: data?.summary ?? "",
      category: data?.category ?? undefined,
    },
  });

  function onSubmit(values: Form) {
    setData(values);
    next();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Summary"
        {...register("summary")}
        aria-invalid={!!errors.summary}
        className="w-full border p-2 rounded"
        error={errors?.summary?.message}
        required
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <SelectCustom
            label="Category"
            required
            error={errors.category?.message}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
          </SelectCustom>
        )}
      />
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
