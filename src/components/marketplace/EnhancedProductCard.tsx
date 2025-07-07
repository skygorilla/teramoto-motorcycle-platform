"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  Zap,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';
import { EnhancedProduct } from '@/types/enhanced';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface EnhancedProductCardProps {
  product: EnhancedProduct;
  onAddToCart?: (product: EnhancedProduct) => void;
  onQuickView?: (product: EnhancedProduct) => void;
}

export function EnhancedProductCard({ 
  product, 
  onAddToCart, 
  onQuickView 
}: EnhancedProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onAddToCart?.(product);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Product link copied to clipboard.",
        });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard.",
      });
    }
  };

  const getStockStatus = () => {
    if (!product.inStock) return { text: 'Out of Stock', color: 'bg-red-500', icon: AlertCircle };
    if (product.stockQuantity <= 5) return { text: 'Low Stock', color: 'bg-orange-500', icon: AlertCircle };
    return { text: 'In Stock', color: 'bg-green-500', icon: CheckCircle };
  };

  const stockStatus = getStockStatus();
  const discountPercentage = product.price > 0 ? Math.round(((product.price * 1.2 - product.price) / (product.price * 1.2)) * 100) : 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white">
          -{discountPercentage}%
        </Badge>
      )}

      {/* Quick Actions */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0"
          onClick={() => onQuickView?.(product)}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className={`h-8 w-8 p-0 ${isWishlisted ? 'text-red-500' : ''}`}
          onClick={handleWishlist}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {/* Brand and Model */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {product.brand}
          </Badge>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${stockStatus.color}`}>
            <stockStatus.icon className="h-3 w-3" />
            {stockStatus.text}
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Compatibility */}
        {product.compatibility.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Compatible with:</p>
            <div className="flex flex-wrap gap-1">
              {product.compatibility.slice(0, 3).map((model, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {model}
                </Badge>
              ))}
              {product.compatibility.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.compatibility.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className="space-y-1">
          {product.shippingInfo.freeShipping && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <Truck className="h-4 w-4" />
              Free Shipping
            </div>
          )}
          {product.warranty && (
            <div className="flex items-center gap-1 text-blue-600 text-sm">
              <Shield className="h-4 w-4" />
              {product.warranty} Warranty
            </div>
          )}
          {product.tags.includes('premium') && (
            <div className="flex items-center gap-1 text-purple-600 text-sm">
              <Zap className="h-4 w-4" />
              Premium Quality
            </div>
          )}
        </div>

        <Separator />

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {discountPercentage > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${Math.round(product.price * 1.2)}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Est. delivery: {product.shippingInfo.estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Stock Progress */}
        {product.inStock && product.stockQuantity <= 10 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Stock Level</span>
              <span>{product.stockQuantity} left</span>
            </div>
            <Progress 
              value={(product.stockQuantity / 20) * 100} 
              className="h-2"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock || isLoading}
          size="lg"
        >
          {isLoading ? (
            "Adding..."
          ) : !product.inStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}