"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  uploadedAt: Date;
}

interface ImageSelectorProps {
  value?: string;
  onSelect: (imageUrl: string) => void;
  placeholder?: string;
}

export function ImageSelector({ value, onSelect, placeholder = "Select image" }: ImageSelectorProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedImages = localStorage.getItem('admin-images');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  const selectedImage = images.find(img => img.url === value);

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {images.map((image) => (
            <SelectItem key={image.id} value={image.url}>
              {image.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Preview Dialog */}
      {selectedImage && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <ImageIcon className="h-4 w-4 mr-2" />
              Preview Selected Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedImage.name}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src={selectedImage.url}
                alt={selectedImage.name}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}