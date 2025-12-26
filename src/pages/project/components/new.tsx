import { lazy } from "react";
const Editor = lazy(() => import("@/components/ui/editor"));

import InputUpload from "@/components/input-upload";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { slugtify } from "@/lib/slugtify";
import { ProjectService } from "@/services/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import SelectJobs from "./select-jobs";

export default function ProjectRegister() {
  const navigate = useNavigate();
  const query = useQueryClient();
  const projectSchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    job_id: z.string().min(1, "Job is required"),
    short_detail: z
      .string()
      .min(10, "Short detail must be at least 10 characters"),
    title: z.string().min(5, "Title must be at least 5 characters"),
    detail: z.string().min(10, "Detail must be at least 10 characters"),
    thumnail_url: z
      .string()
      .min(5, "Thumnail URL must be at least 5 characters"),
  });
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      slug: "",
      short_detail: "",
      title: "",
      detail: "",
      thumnail_url: "",
      job_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    console.log(values);

    const res = await ProjectService.createProject(values);
    if (res.status === "success") {
      toast.success("Project created successfully!");
      await query.invalidateQueries({ queryKey: ["project-data"] });
      form.reset();
      navigate({ to: "/project" });
    } else {
      toast.error("Failed to create project.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">
        {form.watch("title").toUpperCase() || "New Project"}
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-end gap-4">
          <Button type="submit">Save </Button>

          <Button
            variant={"outline"}
            type="button"
            onClick={() => form.reset()}
          >
            Cancel
          </Button>
        </div>
        <FieldGroup className="grid md:grid-cols-2  gap-4 border-t pt-4 mt-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                <Input
                  {...field}
                  maxLength={50}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Input your title"
                  autoComplete="off"
                  onChange={(e) => {
                    form.setValue("slug", slugtify(e.target.value as string));
                    field.onChange(e);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-slug">Slug</FieldLabel>
                <Input
                  {...field}
                  readOnly
                  id="form-rhf-demo-slug"
                  aria-invalid={fieldState.invalid}
                  placeholder="Input your company"
                  autoComplete="off"
                  value={field.value}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="short_detail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-short_detail">
                  Short Detail
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-duration"
                  aria-invalid={fieldState.invalid}
                  placeholder="Input your duration"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="thumnail_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-thumnail_url">
                  Thumnail URL
                </FieldLabel>
                <InputUpload name="thumnail_url" onChange={field.onChange} />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="job_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="col-span-1">
                <FieldLabel htmlFor="form-rhf-demo-detail">
                  Select Job
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <SelectJobs
                  name="job_id"
                  onChange={field.onChange}
                  value={field.value}
                />
              </Field>
            )}
          />
          <Controller
            name="detail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="col-span-2">
                <FieldLabel htmlFor="form-rhf-demo-detail">Detail</FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <Editor data={field.value} onChange={field.onChange} />
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
