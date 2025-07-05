
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { siteImages } from "@/config/images";

// Transform the siteImages object into an array for the select component
const availableImages = Object.entries(siteImages).map(([key, url]) => ({
  id: key,
  // Format key for display e.g., "heroBanner" -> "Hero Banner"
  name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), 
  url: url,
}));

interface ImageSelectorProps {
  value?: string;
  onSelect: (imageUrl: string) => void;
  placeholder?: string;
}

export function ImageSelector({ value, onSelect, placeholder = "Select image" }: ImageSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedImage = availableImages.find(img => img.url === value);

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {availableImages.map((image) => (
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
