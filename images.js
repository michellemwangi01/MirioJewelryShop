const fs = require('fs');
const Jimp = require('jimp');

const imageFolderPath = './Images/verticalImages';

fs.readdir(imageFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading image folder:', err);
    return;
  }

  const imageFiles = files.filter(file => {
    const extension = file.split('.').pop().toLowerCase();
    return extension === 'png' || extension === 'jpg' || extension === 'jpeg';
  });

  imageFiles.forEach((file, index) => {
    const imagePath = imageFolderPath + file;

    Jimp.read(imagePath, (err, image) => {
      if (err) {
        console.error('Error processing image:', err);
        return;
      }

      if (image.bitmap.height > image.bitmap.width) {
        image.rotate(45, false, (err, rotatedImage) => {
          if (err) {
            console.error('Error rotating image:', err);
            return;
          }

          // Save the rotated image (overwrite the original file)
          rotatedImage.write(imagePath, () => {
            console.log('Image rotated:', file);
            if (index === imageFiles.length - 1) {
              console.log('All images processed.');
            }
          });
        });
      } else {
        console.log('Image does not need rotation:', file);
        if (index === imageFiles.length - 1) {
          console.log('All images processed.');
        }
      }
    });
  });
});
