import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { boardGameCategories, Game } from "@/models/game";
import { useState } from "react";
import { ADD_GAME } from "@/graphql/mutations";
import { GET_GAMES } from "@/graphql/queris";

export function AddGameDialog() {
  const [open, setOpen] = useState(false);
  const [addGame] = useMutation(ADD_GAME, {
    refetchQueries: [{ query: GET_GAMES }], // Refresh game list after adding
  });
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(500).optional(),
    image: z.string().optional(),
    category: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newGame: Omit<Game, 'id'> = {
      name: values.name,
      description: values.description ?? "",
      image: values.image ?? "",
      category: values.category ?? "",
      rating: 0,
    };

    addGame({ variables: newGame });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">Add game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new game</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new game to your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the game" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Description of the game"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional):</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={boardGameCategories[0]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select game category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boardGameCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
