import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { boardGameCategories } from "@/models/game";
import { useState, useRef } from "react";
import ImageCropper from "@/components/imageCrop/imageCropper";
import { Game, useUpdateGameMutation, useUploadImageMutation } from "@/graphql/types";

interface EditGameDialogProps {
  game: Game | null;
  open: boolean;
  onClose: () => void;
}

export default function EditGameDialog({ game, open, onClose }: EditGameDialogProps) {
  if(!game) return null;
  const [imageUrl, setImageUrl] = useState<string>(game.image || "");
  const [cropperOpen, setCropperOpen] = useState<boolean>(false);
  const [rawImage, setRawImage] = useState<string | null>(null);

  const [uploadImage, { loading: uploading }] = useUploadImageMutation();
  const [updateGame] = useUpdateGameMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(500).optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    rating: z.number().min(0).max(5),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: game.name,
      description: game.description || '',
      image: game.image || '',
      category: game.category || '',
      rating: game.rating || 0,
    },
  });

  // ✅ Handle form submission for updating game
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateGame({
      variables: {
        updateGameInput: {
          id: game.id,
          name: values.name,
          description: values.description,
          image: imageUrl,
          category: values.category,
          rating: values.rating,
        },
      },
    });

    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setRawImage(reader.result as string);
        setCropperOpen(true); // Open cropper
      };

      reader.readAsDataURL(file);
    }
  };

  // ✅ After cropping, upload image
  const handleCropComplete = async (croppedImg: Blob | null) => {
    if (!croppedImg) return;

    try {
      const file = new File([croppedImg], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      const { data } = await uploadImage({ variables: { file } });
      setImageUrl(data?.uploadImage.url || '');
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Game</DialogTitle>
            <DialogDescription>
              Update game details and save changes.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="Game Name" {...field} />
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
                    <FormLabel>Description:</FormLabel>
                    <FormControl>
                      <Input placeholder="Game Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Image:</FormLabel>
                <Button
                  type="button"
                  onClick={triggerFileSelect}
                  className="w-fit"
                >
                  {uploading ? "Uploading..." : "Change Image"}
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
                    alt="Game"
                    className="mt-2 w-32 h-32 object-cover rounded-md"
                  />
                )}
              </FormItem>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={game.category || 'All'}
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

              <Button type="submit" disabled={uploading}>
                Save Changes
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* ✅ Image Cropper Dialog */}
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
