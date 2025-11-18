import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HomeService } from "@/services/home";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  id: z.string(),
  name: z
    .string(),
  avatar_url: z
    .string(),
  positions: z
    .string(),
  phone: z
    .string(),
  email: z
    .string(),
  tiktok: z
    .string(),
  facebook: z
    .string(),
  address: z
    .string(),
  website: z
    .string(),



})
export default function Home() {
  const { data, isLoading } = useQuery({
    queryFn: () => HomeService.getHome(),
    queryKey: ["home-data"],

  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    values: data
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await HomeService.updateHome(data);
    console.log(res);
  }
  if (isLoading) return <div className="flex justify-center items-center">Loading...</div>;
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} >
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <section className="col-span-3">
          <h1 className="text-4xl font-bold mb-4">Basic Information</h1>
        </section>

        <section className="col-span-3 flex justify-end">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" className="ml-2" onClick={() => form.reset()}>
            Cancel
          </Button>
        </section>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-name">
                Name
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-name"
                aria-invalid={fieldState.invalid}
                placeholder="Input your name"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="avatar_url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-avatar_url">
                Avartar URL
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-avatar_url"
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
          name="positions"
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
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-email">
                Email
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
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-phone">
                Phone
              </FieldLabel>
              <Input
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
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-address">
                Address
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-address"
                aria-invalid={fieldState.invalid}
                placeholder="Input your address"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="facebook"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-facebook">
                Facebook
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-facebook"
                aria-invalid={fieldState.invalid}
                placeholder="Input your facebook"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-tiktok">
                Tiktok
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-tiktok"
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
          name="website"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-website">
                Website
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-website"
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
      </FieldGroup>
    </form >
  );
}
