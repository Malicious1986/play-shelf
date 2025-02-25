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
import { useRef, useState } from "react";
import { ADD_GAME, UPLOAD_IMAGE } from "@/graphql/mutations";
import { GET_GAMES } from "@/graphql/queris";
import ImageCropper from "@/components/imageCrop/imageCropper";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function AddGameDialog() {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState<boolean>(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const filters = useSelector((state: RootState) => state.filters.filters);

  const [uploadImage, { loading: uploading }] = useMutation(UPLOAD_IMAGE);
  const [addGame] = useMutation(ADD_GAME, {
    refetchQueries: [{ query: GET_GAMES, variables: filters }],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newGame: Omit<Game, "id"> = {
      name: values.name,
      description: values.description ?? "",
      image: imageUrl || './images/fallback.jpg',
      category: values.category ?? "",
      rating: 0,
    };

    await addGame({ variables: {
      addGameInput: newGame,
    } });
    form.reset();
    setImageUrl(null);
    setOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setRawImage(reader.result as string);
        setCropperOpen(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedImg: Blob | null) => {
    if (!croppedImg) {
      console.error("No cropped image provided");
      return;
    }
  
    if (croppedImg.size === 0) {
      console.error("Cropped image is empty");
      return;
    }
  
    try {
      const file = new File([croppedImg], "cropped-image.jpg", {
        type: "image/jpeg",
      });
  
      const { data } = await uploadImage({ variables: { file } });
      setImageUrl(data.uploadImage); // ✅ Save uploaded image URL
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };
  

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" variant="outline">
            Add game
          </Button>
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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

                <FormItem>
                  <FormLabel>Image Upload:</FormLabel>
                  <Button
                    type="button"
                    onClick={triggerFileSelect}
                    disabled={uploading}
                    className="w-fit"
                  >
                    {uploading ? "Uploading..." : "Select Image"}
                  </Button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-md"
                    />
                  )}

                  <FormMessage />
                </FormItem>

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

                <Button type="submit" disabled={form.getFieldState("name").invalid || uploading}>
                  {uploading ? "Uploading Image..." : "Add Game"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          open={cropperOpen}
          onClose={() => setCropperOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
}
