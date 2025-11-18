import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AboutService } from "@/services/about";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PiIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";


export default function About() {
  const { data, isLoading } = useQuery({
    queryFn: () => AboutService.getAbout(),
    queryKey: ["about-data"],

  });

  const formSchema = z.object({
    id: z.string(),
    slogan: z
      .string("Slogan is required").min(10, { message: "Slogan must be at least 3 characters." }),
    client_worked: z
      .string("Client Worked is required"),
    client_description: z
      .string("Client Completed is required"),
    works_experiened: z
      .string("Years Experience is required"),
    works_description: z
      .string("Years Experience is required"),




  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    values: data
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await AboutService.updateAbout(data);
    toast.success("About updated successfully!");
    return res;
  }
  if (isLoading) return <div className="flex justify-center items-center">Loading...</div>;
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} >
      <FieldGroup className="grid gap-4 md:grid-cols-2">

        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 ">About <PiIcon className="text-orange-300" /></h1>

        <section className="flex justify-end col-span-1 md:col-span-2 ">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" className="ml-2" onClick={() => form.reset()}>
            Cancel
          </Button>
        </section>
        <Controller
          name="slogan"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-name">
                Slogan
              </FieldLabel>
              <Textarea
                {...field}
                id="form-rhf-demo-slogan"
                aria-invalid={fieldState.invalid}
                placeholder="Input your slogan"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="client_worked"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-client_worked">
                Client Worked
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-client_worked"
                aria-invalid={fieldState.invalid}
                placeholder="Input your avatar URL"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="client_description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-client_description">
                Client Description
              </FieldLabel>
              <Textarea
                {...field}
                id="form-rhf-demo-client_description"
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
          name="works_experiened"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-works_experiened">
                Work Experienced
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-works_experiened"
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
          name="works_description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-phone">
                Works Description
              </FieldLabel>
              <Textarea
                {...field}
                id="form-rhf-demo-phone"
                aria-invalid={fieldState.invalid}
                placeholder="Input your phone"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />


      </FieldGroup>
    </form >
  )
}
