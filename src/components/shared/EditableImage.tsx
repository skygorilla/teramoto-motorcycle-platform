
"use client";

import { useState, useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type EditableImageProps = ImageProps & {
  imageKey: string;
};

export function EditableImage({ imageKey, className, src: initialSrc, ...props }: EditableImageProps) {
  const { user, loading: authLoading } = useAuth();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin = !authLoading && user?.email === adminEmail;
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (previewUrl && selectedFile) {
      setCurrentSrc(previewUrl);
      toast({
        title: "Image Preview Updated",
        description: `To make this change permanent, add '${selectedFile.name}' to the 'public/images' folder and update the configuration.`,
      });
    }
    setOpen(false);
    setPreviewUrl(null);
    setSelectedFile(null);
  };
  
  // @ts-ignore - 'priority' is a valid prop but might cause TS issues here.
  const imageElement = <Image className={className} src={currentSrc} {...props} />;

  if (!isAdmin) {
    return imageElement;
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setPreviewUrl(null);
        setSelectedFile(null);
      }
    }}>
      <div className="relative group">
        <div className={cn("transition-opacity group-hover:opacity-75", className)}>
            {imageElement}
        </div>
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
          <DialogDescription>Upload a new image to preview the change. This change will only be visible to you until you make it permanent.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div 
              className="flex items-center justify-center w-full"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileChange({ target: { files: e.dataTransfer.files } } as any);
                }
              }}
            >
                <label 
                  htmlFor="file-upload" 
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF (MAX. 800x400px)</p>
                    </div>
                    <input ref={fileInputRef} id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
            </div> 

          {previewUrl && (
             <div className="aspect-video relative mt-4 overflow-hidden rounded-md border">
                <Image src={previewUrl} alt="New image preview" fill className="object-cover" />
             </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!previewUrl}>
            Use this Image (Preview)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
