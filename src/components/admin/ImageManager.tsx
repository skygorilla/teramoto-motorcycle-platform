"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  uploadedAt: Date;
}

export function ImageManager() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('admin-images');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  // Save images to localStorage
  const saveImages = (newImages: UploadedImage[]) => {
    localStorage.setItem('admin-images', JSON.stringify(newImages));
    setImages(newImages);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    
    setUploading(true);
    const newImages: UploadedImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      // Convert to base64 for local storage
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      newImages.push({
        id: Date.now() + i + '',
        name: file.name,
        url: base64,
        uploadedAt: new Date(),
      });
    }

    const updatedImages = [...images, ...newImages];
    saveImages(updatedImages);
    setUploading(false);
    
    toast({
      title: "Images Uploaded",
      description: `${newImages.length} images uploaded successfully.`,
    });
  };

  const deleteImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    saveImages(updatedImages);
    toast({
      title: "Image Deleted",
      description: "Image removed successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Image Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload images or drag and drop
              </p>
              <Button variant="outline" disabled={uploading}>
                {uploading ? "Uploading..." : "Select Images"}
              </Button>
            </div>
          </label>
        </div>

        {/* Images Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg border">
                  <Image
                    src={image.url}
                    alt={image.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteImage(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {image.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No images uploaded yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}