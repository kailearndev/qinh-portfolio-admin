import InputUpload from "@/components/input-upload";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { JobService } from "@/services/jobs";
import type { IJob } from "@/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type ExperienceDetailProps = {
  data?: IJob;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ExperienceDetail({
  open,
  data,
  onOpenChange,
}: ExperienceDetailProps) {
  const query = useQueryClient();
  const experienceSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Title is required"),
    summary: z.string().min(10, "Summary must be at least 10 characters"),
    job_thumbnail: z.string().min(5, "Thumbnail URL is required"),
  });
  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),

    values: data,
  });

  const onSubmit = async (values: z.infer<typeof experienceSchema>) => {
    const res = await JobService.updateJob({
      ...values,
      id: data?.id || "",
    });
    if (res.status === "success") {
      toast.success("Experience updated successfully!");
      await query.invalidateQueries({ queryKey: ["jobs-data"] });
      open && onOpenChange && onOpenChange(false);
      form.reset();
    } else {
      toast.error("Failed to update experience.");
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent onEscapeKeyDown={() => form.reset}>
        <SheetHeader>
          <SheetTitle>Edit Job Detail</SheetTitle>
          <SheetDescription asChild>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="grid grid-cols-1  gap-4 border-t pt-4 mt-4">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Title
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Input your title"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="summary"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-summary">
                        Summary
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-summary"
                        aria-invalid={fieldState.invalid}
                        placeholder="Input your summary"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="job_thumbnail"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-job_thumbnail">
                        Job Thumbnail
                      </FieldLabel>
                      <InputUpload
                        url={field.value}
                        name="job_thumbnail"
                        onChange={field.onChange}
                        onDelete={() => form.setValue("job_thumbnail", "")}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose onClick={() => form.reset()} asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
