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
import { ProjectService } from "@/services/project";
import type { IProject } from "@/types/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type ProjectDetailProps = {
  data?: IProject;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function ProjectDetail({
  open,
  data,
  onOpenChange,
}: ProjectDetailProps) {
  const query = useQueryClient();
  const projectSchema = z.object({
    id: z.string(),
    slug: z.string().min(1, "Slug is required"),
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

    values: data,
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    const res = await ProjectService.updateProject({
      ...values,
    });
    if (res.status === "success") {
      toast.success("Experience updated successfully!");
      await query.invalidateQueries({ queryKey: ["experience-data"] });
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
          <SheetTitle>Edit Project Detail</SheetTitle>
          <SheetDescription asChild>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="grid grid-cols-1  gap-4 border-t pt-4 mt-4">
                <Controller
                  name="slug"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-slug">Slug</FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-slug"
                        aria-invalid={fieldState.invalid}
                        placeholder="Input your company"
                        autoComplete="off"
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
                  name="detail"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-detail">
                        Detail
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-detail"
                        aria-invalid={fieldState.invalid}
                        placeholder="Input your detail"
                        autoComplete="off"
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
