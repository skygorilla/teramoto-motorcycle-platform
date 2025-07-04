// @/config/images.ts

/**
 * This file centralizes all image paths for the application.
 *
 * HOW TO USE:
 * 1. Make sure your images are in the `public/images/` folder.
 * 2. Replace the placeholder filenames below (e.g., 'hero.jpg') 
 *    with the ACTUAL filenames of your uploaded images.
 *
 * Example:
 * If your hero image is named `main-banner.png`, change:
 *   heroBanner: '/images/hero.jpg',
 * to:
 *   heroBanner: '/images/main-banner.png',
 *
 * The site will automatically update to show your images.
 */
export const siteImages = {
  // Homepage Images
  heroBanner: '/images/hero-banner.jpg', // Main image on the home page
  
  // Appointments Page Images
  workshop: '/images/workshop.jpg', // Image on the booking page
  
  // Transport & Roadside Page Images
  transportVan: '/images/transport-van.jpg', // Image for the transport service
  
  // Vehicle Sales Page Images
  sellVehicle: '/images/sell-vehicle.jpg', // Image for the "Sell Your Vehicle" card
  buyVehicle: '/images/buy-vehicle.jpg',   // Image for the "Looking to Buy" card
};
