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
import { ExperienceService } from "@/services/experience";
import type { IExperience } from "@/types/experience";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type ExperienceDetailProps = {
  data?: IExperience;
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
    company: z.string().min(1, "Company is required"),
    duration: z.string().min(10, "Duration must be at least 10 characters"),
    position: z.string().min(5, "Position must be at least 5 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
  });
  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),

    values: data,
  });

  const onSubmit = async (values: z.infer<typeof experienceSchema>) => {
    const res = await ExperienceService.updateExperience({
      ...values,
      user_id: data?.user_id || "",
      is_public: true,
      about_id: data?.about_id || "",
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
          <SheetTitle>Edit Experience Details</SheetTitle>
          <SheetDescription asChild>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="grid grid-cols-1  gap-4 border-t pt-4 mt-4">
                <Controller
                  name="company"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-company">
                        Company
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-company"
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
                  name="duration"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-duration">
                        Duration
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
                  name="position"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-positions">
                        Positions
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-positions"
                        aria-invalid={fieldState.invalid}
                        placeholder="Input your positions"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-description">
                        Description
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-description"
                        aria-invalid={fieldState.invalid}
                        placeholder="Input your description"
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
