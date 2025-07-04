"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageSelector } from "@/components/admin/ImageSelector";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type EditableImageProps = ImageProps & {
  imageKey: string;
};

export function EditableImage({ imageKey, className, ...props }: EditableImageProps) {
  const { user } = useAuth();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin = user?.email === adminEmail;
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleSave = () => {
    // In a real app, this would trigger a server action to update the database.
    // For now, we just log it and show a toast.
    console.log(`Admin tried to update imageKey "${imageKey}" to:`, selectedImageUrl);
    toast({
      title: "Image Change Simulated",
      description: "A database is required to make this change permanent for all users.",
    });
    setOpen(false);
    setSelectedImageUrl(null);
  };

  if (!isAdmin) {
    // @ts-ignore
    return <Image className={className} {...props} />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="relative group">
        {/* @ts-ignore */}
        <Image className={cn("transition-opacity group-hover:opacity-75", className)} {...props} />
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Change
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Image for: {imageKey}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Select a new image from the ones you've uploaded in the Admin dashboard.</p>
          <ImageSelector
            onSelect={(url) => setSelectedImageUrl(url)}
            value={selectedImageUrl || undefined}
            placeholder="Select a new image"
          />
          {selectedImageUrl && (
             <div className="aspect-video relative mt-4 overflow-hidden rounded-md border">
                <Image src={selectedImageUrl} alt="New image preview" fill className="object-cover" />
             </div>
          )}
          <Button onClick={handleSave} disabled={!selectedImageUrl} className="w-full">
            Save Change (Simulated)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
