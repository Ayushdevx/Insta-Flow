"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Plus, Save, Trash2 } from 'lucide-react';

export default function AutomationPage() {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "Welcome Message",
      trigger: "welcome",
      response: "Thanks for following! Check out our latest content.",
      active: true,
    },
    {
      id: 2,
      name: "Product Inquiry",
      trigger: "price",
      response: "Thank you for your interest! Our pricing starts at $99/month.",
      active: true,
    },
  ]);

  const form = useForm({
    defaultValues: {
      name: "",
      trigger: "",
      response: "",
      active: true,
    },
  });

  const onSubmit = (data) => {
    setAutomations([
      ...automations,
      {
        id: automations.length + 1,
        ...data,
      },
    ]);
    form.reset();
  };

  const deleteAutomation = (id) => {
    setAutomations(automations.filter((automation) => automation.id !== id));
  };

  const toggleAutomation = (id) => {
    setAutomations(
      automations.map((automation) =>
        automation.id === id
          ? { ...automation, active: !automation.active }
          : automation
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Automation Rules</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Rule
        </Button>
      </div>

      {/* New Automation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Automation Rule</CardTitle>
          <CardDescription>
            Set up a new automated response based on specific triggers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rule Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Welcome Message" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this automation rule
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trigger"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Keyword</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., #info" {...field} />
                    </FormControl>
                    <FormDescription>
                      The keyword that will trigger this automation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="response"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Automated Response</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your automated response message"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The message that will be sent when the trigger is detected
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Activate Rule
                      </FormLabel>
                      <FormDescription>
                        Enable or disable this automation rule
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Rule
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Existing Automations */}
      <div className="grid gap-4">
        {automations.map((automation) => (
          <Card key={automation.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                {automation.name}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={automation.active}
                  onCheckedChange={() => toggleAutomation(automation.id)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteAutomation(automation.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div>
                  <span className="font-medium">Trigger:</span>{" "}
                  <code className="rounded bg-muted px-2 py-1">
                    {automation.trigger}
                  </code>
                </div>
                <div>
                  <span className="font-medium">Response:</span>
                  <p className="mt-1 text-muted-foreground">
                    {automation.response}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}