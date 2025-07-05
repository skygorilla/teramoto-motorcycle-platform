
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Folder, Edit } from "lucide-react";

export function ImageManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How to Manage Site Images</CardTitle>
        <CardDescription>To add or change images permanently for all users, follow these steps.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center"><Folder className="mr-2 h-5 w-5 text-primary"/>Step 1: Add Image Files to the Project</h3>
          <p className="text-muted-foreground pl-7">Place your new image files (e.g., <code className="bg-muted px-1 py-0.5 rounded">my-new-image.jpg</code>) inside the <code className="bg-muted px-1 py-0.5 rounded">public/images/</code> folder in your project code.</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center"><Edit className="mr-2 h-5 w-5 text-primary"/>Step 2: Update the Image Configuration</h3>
          <p className="text-muted-foreground pl-7">Open the file <code className="bg-muted px-1 py-0.5 rounded">src/config/images.ts</code> and add a new entry for your image. This makes it available throughout the site for selection.</p>
          <pre className="bg-card p-3 rounded-md text-sm overflow-x-auto border">
            <code>
              {`// src/config/images.ts\n\nexport const siteImages = {\n  // ... existing images\n  myNewImageKey: '/images/my-new-image.jpg',\n};`}
            </code>
          </pre>
        </div>
          <p className="text-sm text-muted-foreground pt-4 border-t border-border/40">This process ensures that your images are part of the site's permanent code and will be available to all visitors after you deploy your changes.</p>
      </CardContent>
    </Card>
  );
}
