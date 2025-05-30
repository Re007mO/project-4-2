"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    //Check image Type First
    const imageInput = document.getElementById("imageInput");
    imageInput.addEventListener('change', (event) => {
        const inputElement = event.target; // Type assertion
        const file = inputElement.files ? inputElement.files[0] : null; // Get the selected file
        const errorMessageDiv = document.getElementById("errorMessage"); // Type assertion for error message div
        if (file) {
            const fileType = file.type; // Get the MIME type of the file
            const allowedTypes = ['image/png', 'image/jpeg']; // Specify allowed types
            // Check if the file type is not allowed
            if (!allowedTypes.includes(fileType)) {
                errorMessageDiv.innerHTML = "Error: Only PNG and JPEG files are allowed."; // Display error message
                document.getElementById("submit").setAttribute("disabled", "true"); // Disable the submit button
                console.log("Invalid file type:", fileType); // Debugging log
            }
            else {
                errorMessageDiv.textContent = ""; // Clear any previous error messages
                document.getElementById("submit").removeAttribute("disabled"); // Enable the submit button
                console.log("Valid file type:", fileType); // Debugging log
            }
        }
        else {
            errorMessageDiv.textContent = ""; // Clear error message if no file is selected
        }
    });
    //upload image
    document.getElementById("uploadForm").addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault(); // Prevent the default form submission
        const imageInput = document.getElementById("imageInput");
        if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
            alert("Choose a file");
            return;
        }
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        //fetch server of upload
        try {
            const res = yield fetch('http://localhost:3000/api/server/upload', {
                method: 'POST',
                body: formData
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            // Change image name
            const imgInput = document.getElementById('imageInput');
            // Check if input exists and has files
            if (!imgInput || !imgInput.files || imgInput.files.length === 0) {
                throw new Error("No file selected");
            }
            const imgName = imgInput.files[0].name;
            let found = false;
            const image = document.createElement('img');
            if (!found) {
                const testUrl = `/uploaded/${imgName}`;
                const windowBefore = document.getElementById("imageWindowBefore");
                //replace existing image                     
                let existingImg = windowBefore.querySelector("img.example");
                if (existingImg) {
                    existingImg.src = testUrl;
                }
                else {
                    //display uploaded
                    image.classList.add("example");
                    image.style.width = '500px';
                    image.style.margin = '100px';
                    image.style.marginLeft = '30%';
                    image.src = testUrl;
                    windowBefore.appendChild(image);
                    found = true;
                }
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }));
    //resize uploaded image
    document.getElementById("resizeFormUploaded").addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        event.preventDefault();
        try {
            document.getElementById('upload').classList.add('show');
            // Get elements with proper null checks
            const imageInput = document.getElementById("imageInput");
            const widthInput = document.getElementById("imgWidth");
            const heightInput = document.getElementById("imgHeight");
            // Validate inputs exist
            if (!imageInput || !widthInput || !heightInput) {
                throw new Error("Required form elements not found");
            }
            // Get values
            const imageUploaded = imageInput.value;
            const imgWidth = parseInt(widthInput.value);
            const imgHeight = parseInt(heightInput.value);
            // Regular expression to check if the input is a valid number
            const numberPattern = /^\d+$/; // Matches one or more digits
            // Validate width and height
            if (!numberPattern.test(widthInput.value) || !numberPattern.test(heightInput.value)) {
                alert("Width and Height must be a valid number.");
                return;
            }
            // Validate inputs type
            if (isNaN(imgWidth) || isNaN(imgHeight)) {
                alert("Not valid width and height");
                throw new Error("Not valid width and height");
            }
            // Validate inputs is greater than 0
            if (imgWidth <= 0 || imgHeight <= 0) {
                alert("Enter Number greater than zero");
                throw new Error("Not greater than zero");
            }
            // Create body data
            const bodyData = {
                width1: imgWidth, // No .value needed - imgWidth is already the value
                height1: imgHeight, // No .value needed - imgHeight is already the value
                image: imageUploaded
            };
            if (!imgWidth || !imgHeight) {
                alert("Please choose width and height");
            }
            const response = yield fetch("http://localhost:3000/api/server/resizeUploaded", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            if (!response.ok) {
                throw new Error("cannot fetch 'resizeUploaded'");
            }
            const fullPath = document.getElementById("imageInput").value;
            const fileName = fullPath.split("\\").pop();
            const resizedUrl = `/image/resized/resized-uploaded-gallery/${imgWidth}x${imgHeight}-${fileName}`;
            console.log(resizedUrl);
            let found = false;
            if (!found) {
                let imageAfter = document.createElement("img");
                const windowAfter = document.getElementById("imageWindowAfter");
                let existingImg = windowAfter.querySelector("img.resized");
                let resultHead = document.createElement("h1");
                windowAfter.appendChild(resultHead);
                //replace existing image
                if (existingImg) {
                    existingImg.src = resizedUrl;
                }
                else {
                    //display resized uploaded
                    resultHead.innerHTML = "Result🎇";
                    imageAfter.src = resizedUrl;
                    imageAfter.style.margin = '100px';
                    imageAfter.style.marginLeft = '30%';
                    imageAfter.classList.add("resized");
                    windowAfter.appendChild(imageAfter);
                    found = true;
                }
                //add resized to gallery
                const gallery = document.getElementById("galleryResized");
                const imageInput = document.getElementById("imageInput");
                const fileName = (_b = (_a = imageInput === null || imageInput === void 0 ? void 0 : imageInput.files) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.name;
                if (!gallery || !fileName) {
                    // Handle error case appropriately
                    return;
                }
                const resizedUrlGallery = `/image/resized/resized-uploaded-gallery/${imgWidth}x${imgHeight}-${fileName}`;
                const resizedImage = document.createElement("img");
                resizedImage.src = resizedUrlGallery;
                resizedImage.classList.add("example");
                resizedImage.classList.add("exampleUploaded");
                resizedImage.classList.add("imgex");
                gallery.appendChild(resizedImage);
                console.log("Image added to gallery successfully");
                let selectedImgSrcUploaded;
                const chooseImgs = document.querySelectorAll(".exampleUploaded"); // Select all elements with the class 'example'
                //style choosed
                chooseImgs.forEach((chooseImg) => {
                    chooseImg.addEventListener("click", () => {
                        chooseImgs.forEach((img) => {
                            img.style.boxShadow = "none";
                        });
                        console.log("Image selected");
                        chooseImg.style.boxShadow = "10px 10px 5px lightblue";
                        chooseImg.style.transition = "box-shadow 0.5s ease";
                        selectedImgSrcUploaded = chooseImg.src;
                        console.log("Selected image:", selectedImgSrcUploaded);
                    });
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    let selectedImgSrc;
    const chooseImgs = document.querySelectorAll(".example"); // Select all elements with the class 'example'
    chooseImgs.forEach((chooseImg) => {
        chooseImg.addEventListener("click", () => {
            chooseImgs.forEach((img) => {
                img.style.boxShadow = "none";
            });
            console.log("Image selected");
            chooseImg.style.boxShadow = "10px 10px 5px lightblue";
            chooseImg.style.transition = "box-shadow 0.5s ease";
            selectedImgSrc = chooseImg.src;
            console.log("Selected image:", selectedImgSrc);
        });
    });
    //resize image placeholder
    const resizeForm = document.getElementById("resizeForm");
    if (resizeForm instanceof HTMLFormElement) {
        resizeForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            e.preventDefault();
            try {
                //define bodyData 
                const exImgs = document.querySelectorAll(".example");
                exImgs.forEach((exImg) => __awaiter(void 0, void 0, void 0, function* () {
                    exImg.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
                        console.log("Selected image:", selectedImgSrc);
                    }));
                    if (!chooseImgs) {
                        alert('please choose image');
                    }
                }));
                if (!selectedImgSrc) {
                    console.error("selectedImgSrc is undefined");
                    return;
                }
                const fileName = (_a = selectedImgSrc.split("/").pop()) !== null && _a !== void 0 ? _a : "";
                const imgWdth = document.getElementById("imgWdth");
                const imght = document.getElementById("imght");
                // Validate inputs exist
                if (!imageInput || !imgWdth || !imght) {
                    throw new Error("Required form elements not found");
                }
                // Get values
                const imgWidth = parseInt(imgWdth.value);
                const imgHeight = parseInt(imght.value);
                // Regular expression to check if the input is a valid number
                const numberPattern = /^\d+$/; // Matches one or more digits
                // Validate width and height
                if (!numberPattern.test(imgWdth.value) || !numberPattern.test(imght.value)) {
                    alert("Width and Height must be a valid number.");
                    return;
                }
                // Validate inputs type
                if (isNaN(imgWidth) || isNaN(imgHeight)) {
                    alert("Not valid width and height");
                    throw new Error("Not valid width and height");
                }
                // Validate inputs is greater than 0
                if (imgWidth <= 0 || imgHeight <= 0) {
                    alert("Enter Number greater than zero");
                    throw new Error("Not greater than zero");
                }
                const resizedFileName = `${imgWidth}x${imgHeight}-${fileName}`;
                const resizedUrl = `/image/resized/resized-gallery/${resizedFileName}`;
                const checkResponse = yield fetch(resizedUrl, { method: "HEAD" });
                if (checkResponse.ok) {
                    // if there is the same image with same dimensions
                    const displayDiv = document.getElementById("display");
                    displayDiv.innerHTML = `
                <div class="cached-message">
                    <h2>This image Had been resized before </h2>
                    <img src="${resizedUrl}" style="max-width: 300px; margin: 15px 0; border-radius: 8px;">
                    <p>Dimensions:${imgWidth}x${imgHeight}</p>
                    <a href="http://localhost:3000/image/resized/resized-gallery/${resizedFileName}" target="_blank">http://localhost:3000/image/resized/resized-gallery/${resizedFileName}</a>
                </div>
            `;
                    return; //stop 
                }
                const displayDiv = document.getElementById("display");
                displayDiv.innerHTML = ``;
                const bodyData = {
                    width: imgWidth,
                    height: imgHeight,
                    image: fileName
                };
                console.log(bodyData);
                console.log(selectedImgSrc);
                //fetch resize route
                const response = yield fetch('http://localhost:3000/api/server/resize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                });
                if (!response.ok) {
                    throw new Error("cannot fetch 'http://localhost:3000/api/server/resize'");
                }
                if (!selectedImgSrc) {
                    console.error("selectedImgSrc is undefined");
                    return;
                }
                const resizedUrlDisplay = `/image/resized/resized-gallery/${imgWidth}x${imgHeight}-${(_c = (_b = selectedImgSrc.split("/").pop()) === null || _b === void 0 ? void 0 : _b.split("\\").pop()) !== null && _c !== void 0 ? _c : ""}`;
                console.log(resizedUrlDisplay);
                let found = false;
                if (!found) {
                    const displayImg = document.createElement("img");
                    const displayDiv = document.getElementById("display");
                    let existingImg = displayDiv.querySelector("img.resized");
                    let resultHead = document.createElement("h1");
                    displayDiv.appendChild(resultHead);
                    //replace existing image
                    if (existingImg) {
                        existingImg.src = resizedUrlDisplay;
                    }
                    else {
                        //display resized uploaded
                        resultHead.innerHTML = "Result🎇";
                        displayImg.src = resizedUrlDisplay;
                        displayImg.style.margin = '100px';
                        displayImg.style.marginLeft = '30%';
                        displayImg.classList.add("resized");
                        displayDiv.appendChild(displayImg);
                        found = true;
                    }
                    //add resized to gallery
                    const gallery = document.getElementById("gallery");
                    const resizedUrlGallery = resizedUrlDisplay;
                    const resizedImage = document.createElement("img");
                    resizedImage.src = resizedUrlGallery;
                    resizedImage.classList.add("exampleUploaded");
                    resizedImage.classList.add("example");
                    resizedImage.classList.add("imgex");
                    gallery.appendChild(resizedImage);
                    console.log("Image added to gallery successfully");
                    //choose image
                    let selectedImgSrcGallery;
                    const chooseImgs = document.querySelectorAll(".example"); // Select all elements with the class 'example'
                    chooseImgs.forEach((chooseImg) => {
                        chooseImg.addEventListener("click", () => {
                            chooseImgs.forEach((img) => {
                                img.style.boxShadow = "none";
                            });
                            console.log("Image selected");
                            chooseImg.style.boxShadow = "10px 10px 5px lightblue";
                            chooseImg.style.transition = "box-shadow 0.5s ease";
                            selectedImgSrcGallery = chooseImg.src;
                            console.log("Selected image from gallery placeholder:", selectedImgSrcGallery);
                        });
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
    //resize from gallery
    document.getElementById("resizeFormResized").addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            // Get the selected image from elements that already have the box shadow
            const selectedImg = document.querySelector(".exampleUploaded[style*='box-shadow']");
            if (!selectedImg) {
                alert("Please select an image first by clicking on it");
                return;
            }
            const selectedImgSrcUploaded = selectedImg.src;
            const imgWdth1 = document.getElementById("imgWdth1");
            const imght1 = document.getElementById("imght1");
            console.log("Selected image:", selectedImgSrcUploaded);
            const imgWidth = parseInt(imgWdth1.value);
            const imgHeight = parseInt(imgWdth1.value);
            // Regular expression to check if the input is a valid number
            const numberPattern = /^\d+$/; // Matches one or more digits
            // Validate width and height
            if (!numberPattern.test(imgWdth1.value) || !numberPattern.test(imght1.value)) {
                alert("Width and Height must be a valid number .");
                return;
            }
            // Validate inputs type
            if (isNaN(imgWidth) || isNaN(imgHeight)) {
                alert("Not valid width and height");
                throw new Error("Not valid width and height");
            }
            // Validate inputs is greater than 0
            if (imgWidth <= 0 || imgHeight <= 0) {
                alert("Enter Number greater than zero");
                return;
            }
            if (!imgWidth || !imgHeight) {
                alert("Please choose width and height");
                return;
            }
            const fileName = selectedImgSrcUploaded.split("/").pop();
            const resizedFileName = `${imgWidth}x${imgHeight}-${fileName}`;
            const resizedUrl = `/image/resized/resized-gallery/${resizedFileName}`;
            const checkResponse = yield fetch(resizedUrl, { method: 'HEAD' });
            if (checkResponse.ok) {
                // if there is the same image with same dimensions
                const displayDiv = document.getElementById("displayResized");
                displayDiv.innerHTML = `
                <div class="cached-message">
                    <h2>This image Had been resized before </h2>
                    <img src="${resizedUrl}" style="max-width: 300px; margin: 15px 0; border-radius: 8px;">
                    <p>Dimensions:${imgWidth}x${imgHeight}</p>
                    <a href="http://localhost:3000/image/resized/resized-gallery/${resizedFileName}" target="_blank">http://localhost:3000/image/resized/resized-gallery/${resizedFileName}</a>
                </div>
            `;
                return; //stop 
            }
            const displayDiv2 = document.getElementById("displayResized");
            displayDiv2.innerHTML = ``;
            const bodyData = {
                width: imgWidth,
                height: imgHeight,
                image: fileName
            };
            console.log("Request data:", bodyData);
            const response = yield fetch('http://localhost:3000/api/server/resizeUploadedGallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            if (!response.ok) {
                throw new Error("Cannot fetch resize endpoint");
            }
            const resizedUrlDisplayUploaded = `/image/resized/resized-gallery/${bodyData.width}x${bodyData.height}-${fileName}`;
            console.log("Resized image path:", resizedUrlDisplayUploaded);
            // Display the resized image
            const displayDiv = document.getElementById("displayResized");
            displayDiv.innerHTML = ''; // Clear previous results
            const resultHead = document.createElement("h1");
            resultHead.innerHTML = "Result🎇";
            displayDiv.appendChild(resultHead);
            const displayImg = document.createElement("img");
            displayImg.src = resizedUrlDisplayUploaded;
            displayImg.style.margin = '100px';
            displayImg.style.marginLeft = '30%';
            displayImg.classList.add("resized");
            displayDiv.appendChild(displayImg);
            // Add to gallery
            const gallery = document.getElementById("galleryResized");
            const resizedImage = document.createElement("img");
            resizedImage.src = resizedUrlDisplayUploaded;
            resizedImage.classList.add("exampleUploaded", "example2", "imgex2");
            gallery.appendChild(resizedImage);
            // Set up click event for the new image
            //choose image
            let selectedImgName;
            const chooseImgs = document.querySelectorAll(".exampleUploaded"); // Select all elements with the class 'example'
            chooseImgs.forEach((chooseImg) => {
                chooseImg.addEventListener("click", () => {
                    chooseImgs.forEach((img) => {
                        img.style.boxShadow = "none";
                    });
                    chooseImg.style.boxShadow = "10px 10px 5px lightblue";
                    chooseImg.style.transition = "box-shadow 0.5s ease";
                    selectedImgName = chooseImg.src;
                    console.log("Selected image from gallery:", selectedImgName);
                });
            });
        }
        catch (error) {
            console.error("Error:", error);
            if (error instanceof Error) {
                alert("An error occurred: " + error.message);
            }
            else {
                alert("An unknown error occurred");
            }
        }
    }));
});
