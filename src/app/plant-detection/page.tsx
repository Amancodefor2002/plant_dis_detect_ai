'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PlantDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleScanPlant = () => {
    // TODO: Implement camera access functionality
    console.log('Opening camera...');
  };

  const handleUploadImage = () => {
    // TODO: Implement file upload functionality
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-[#f0f7f0] p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header with Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12">
            <svg viewBox="0 0 24 24" className="w-full h-full text-[#005000]">
              <path
                fill="currentColor"
                d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#005000]">PlantGuard AI</h1>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleScanPlant}
            className="w-full p-6 bg-[#005000] hover:bg-[#004000] text-white rounded-2xl
              flex items-center gap-4 text-2xl font-semibold transition-all duration-200
              hover:shadow-lg active:transform active:scale-[0.98]"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Scan Plant
          </button>

          <button
            onClick={handleUploadImage}
            className="w-full p-6 bg-[#005000] hover:bg-[#004000] text-white rounded-2xl
              flex items-center gap-4 text-2xl font-semibold transition-all duration-200
              hover:shadow-lg active:transform active:scale-[0.98]"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Upload Image
          </button>
        </div>

        {/* Recent Scans Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#005000] mb-6">Recent Scans</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Example recent scans - replace with actual data */}
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl overflow-hidden bg-white shadow-md
                  hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={`/placeholder-leaf-${index}.jpg`}
                    alt={`Recent scan ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 