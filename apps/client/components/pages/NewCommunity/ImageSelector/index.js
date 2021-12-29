import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { Box, Input } from '@chakra-ui/react';

const ImageSelector = ({ setCroppedImage, aspect = 4 / 3 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(null);

  const onCropComplete = useCallback(
    async (croppedArea, croppedAreaPixels) => {
      try {
        const croppedImage = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation
        );
        setCroppedImage({ image: croppedImage });
      } catch (e) {
        console.error(e);
        setCroppedImage(null);
      }
    },
    [image, rotation, setCroppedImage]
  );

  return (
    <>
      <Input
        type="file"
        variant="filled"
        focusBorderColor="lime"
        placeholder="Chọn ảnh bìa"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onloadend = function () {
              setImage(reader.result);
            };
          } else {
            setImage(null);
            setCroppedImage(null);
          }
        }}
        accept="image/png, image/jpeg, image/jpg"
      />
      {image && (
        <Box position="relative" minHeight="300px">
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>
      )}
    </>
  );
};

export default ImageSelector;
