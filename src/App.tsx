"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ModeToggle } from "./components/mode-toggle";
import { toast } from "sonner";

const formSchema = z.object({
  experienceLink: z.string().startsWith("https://www.roblox.com/games/", {
    message: "Experience link must start with https://www.roblox.com/games/",
  }),
});

export function App() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experienceLink: "",
    },
    mode: "all",
  });

  const placeId = form.getValues().experienceLink.split("/")[4];
  const webUrl = `https://www.roblox.com/games/start?placeId=${placeId}`;
  const appUrl = `roblox://placeId=${placeId}`;
  const deeplink = `ro.blox.com/Ebh5?af_dp=${encodeURIComponent(
    appUrl
  )}&af_web_dp=${encodeURIComponent(webUrl)}`;

  return (
    <main>
      <nav className="flex justify-between items-center container mx-auto py-4">
        <h1>Roblox Deeplink Generator</h1>
        <ModeToggle />
      </nav>
      <div className="container mx-auto">
        <div className="max-w-xl">
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="experienceLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.roblox.com/games/..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The link of the experience you want to generate a deeplink
                      for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!form.formState.errors.experienceLink &&
                form.getValues().experienceLink != "" && (
                  <>
                    <FormItem>
                      <FormLabel>Deeplink (web)</FormLabel>
                      <Input
                        readOnly
                        className="read-only:opacity-50 read-only:cursor-copy"
                        onClick={() => {
                          navigator.clipboard.writeText(webUrl);
                          toast.success("Copied to clipboard");
                        }}
                        value={webUrl}
                      />
                      <FormDescription>
                        Click the field to copy the link.
                      </FormDescription>
                    </FormItem>
                    <FormItem>
                      <FormLabel>Deeplink (app)</FormLabel>
                      <Input
                        readOnly
                        className="read-only:opacity-50 read-only:cursor-copy"
                        onClick={() => {
                          navigator.clipboard.writeText(webUrl);
                          toast.success("Copied to clipboard");
                        }}
                        value={appUrl}
                      />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Deeplink (deferred)</FormLabel>
                      <Input
                        readOnly
                        className="read-only:opacity-50 read-only:cursor-copy"
                        onClick={() => {
                          navigator.clipboard.writeText(webUrl);
                          toast.success("Copied to clipboard");
                        }}
                        value={deeplink}
                      />
                    </FormItem>
                  </>
                )}
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
