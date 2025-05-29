# Image processing API Project
 
A web application that allows you to upload and resize images.

## Main Features
### Image upload
- upload Image form local computer Via Multer
- Store Image in `uploaded` folder
- Show uploaded Image in web interface without refreshing

### Image Resizing
- Resize uploaded image using Sharp
- Add Resized to `resized-uploaded-gallery` folder 
- Display resized in web without refreshing

### Gallery 
- Add Resized images to gallery
- Select and resize again from gallery
- **Caching**:  If the image is resized before ,retrieve the existing image with dimensions an its link

### Placeholder Gallery
- Select and Resize placeholder images 
- Add Resized placeholder to the same gallery and resize it again
- Store in `resized-gallery` folder
-  **Caching**:  If the image is resized before ,retrieve the existing image with dimensions an its link

### Tesing
- Testing syntax with pretty and Eslint
- Jasmine:
     - Endpoints of Backend
     - Uploading image functionalty
     - resizing image functionalty 

### Error Handling
- For missing Image,width,height and others


## Installation

### Start the Server (Works at Localhost:3000)
Ensure installing [Node.js](https://nodejs.org/en) and [Npm](https://www.npmjs.com/) first

```bash 
 cd api 
 ```
 Install dependencies
```bash 
 npm install 
 ```
 To run Typescript:
```bash 
 npm run build
 ```
 To run Express server:
```bash 
 npm run start
 ```


 ### Start FrontEnd 
In new Terminal:
```bash 
 cd Front-End
 ```

 Install npm 
```bash 
 npm install 
 ```

 To run Typescript:
```bash 
 npm run build
 ```

 ### Testing by Pretty, Eslint, Jasmine
 In new terminal 
```bash 
 cd api
 ```

 To run Eslint:
```bash 
 npm run lint
 ```
 To run Prettier:
```bash 
 npm run pretty
 ```

 To run Jasmine:
```bash 
 npm run jasmine
 ```

## Main Endpoints
1. `"/upload"` for Uploading images
2. `"/resizedUploaded"` for resizing uploaded images
3. `"/resize"` for resizing Placeholder images
4. `"/resizeUploadedGallery"` for resizing images From gallery 

All endpoint are linked to main Server at `Localhost:3000`