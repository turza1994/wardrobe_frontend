'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function NewsletterSignup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock API call
    console.log(values);
    toast.success("Welcome to the community! Check your email for your 10% discount code.");
    form.reset();
  }

  return (
    <section className="bg-primary/5 py-20 px-4 md:px-8 border-t border-border/50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-4 text-foreground">
          Join Our Community
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-8 font-light">
          Subscribe to our newsletter and get 10% off your first order. Be the first to know about new collections and exclusive offers.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative group">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1 space-y-0 relative">
                  <FormControl>
                    <Input 
                      placeholder="Enter your email address" 
                      className="h-12 rounded-none border-foreground/20 bg-background focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all pr-4" 
                      {...field} 
                    />
                  </FormControl>
                  <div className="absolute -bottom-6 left-0 text-left">
                     <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="h-12 px-8 rounded-none shrink-0"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
