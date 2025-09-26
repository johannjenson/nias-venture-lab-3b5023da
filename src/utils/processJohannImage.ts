import { removeBackground, loadImage } from './backgroundRemoval';

export const processJohannImage = async (): Promise<string> => {
  try {
    // Load the original image
    const response = await fetch('/src/assets/johann-jenson.png');
    const blob = await response.blob();
    const imageElement = await loadImage(blob);
    
    // Remove background
    const processedBlob = await removeBackground(imageElement);
    
    // Create a URL for the processed image
    return URL.createObjectURL(processedBlob);
  } catch (error) {
    console.error('Error processing Johann image:', error);
    // Return original image as fallback
    return '/src/assets/johann-jenson.png';
  }
};