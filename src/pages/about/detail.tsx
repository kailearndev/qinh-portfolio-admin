import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import type { About } from "@/types/about";
import { abooutSchema, type AboutFormValues } from "./schema/about";

export default function AboutDetail({ data }: { data: About }) {
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(abooutSchema),
    defaultValues: {
      email: data.email,
      address: data.address,
      phone: data.phone,
      experience: data.experience,
      client_worked: data.client_worked,
    },
  });

  const onSubmit = (values: AboutFormValues) => {
    console.log("✅ Form submit:", values);
    // TODO: gọi API update PocketBase ở đây
    // await pb.collection("about").update(data.id, values)
  };

  return (
    <Form {...form}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold ">About Detail</h1>
        <div className="col-span-full flex justify-end pt-4">
          <Button variant={"secondary"} type="submit">
            Save
          </Button>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Ho Chi Minh City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+84..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Experience */}
        <FormField
          control={form.control}
          name="client_worked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clients Worked</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
