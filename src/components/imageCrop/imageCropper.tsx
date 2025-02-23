import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import getCroppedImg from "./cropImage";

interface ImageCropperProps {
  imageSrc: string;
  open: boolean;
  onClose: () => void;
  onCropComplete: (croppedImage: Blob | null) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, open, onClose, onCropComplete }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);

  const onZoomChange = (zoom: number) => setZoom(zoom);

  const onCropCompleteHandler = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crop Your Image</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-80 bg-gray-200 rounded-md overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1} // ✅ Square aspect ratio
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteHandler}
            
          />
        </div>

        <div className="mt-4">
          <p className="text-sm mb-2">Zoom</p>
          <Slider
            defaultValue={[1]}
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(value: number[]) => onZoomChange(value[0])}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Crop & Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
