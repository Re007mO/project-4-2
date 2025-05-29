document.addEventListener('DOMContentLoaded', () => {
  //upload image
  (document.getElementById("uploadForm") as HTMLFormElement).addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission


    const imageInput = document.getElementById("imageInput") as HTMLInputElement | null;

    if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
      alert("Choose a file");
      return;
    }

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

    //fetch server of upload
    try {
      const res = await fetch('http://localhost:3000/api/server/upload', {
        method: 'POST',
        body: formData
      });


      if (!res.ok) {
        throw new Error('Network response was not ok');
      }





      // Change image name
      const imgInput = document.getElementById('imageInput') as HTMLInputElement | null
      // Check if input exists and has files
      if (!imgInput || !imgInput.files || imgInput.files.length === 0) {
        throw new Error("No file selected");
      }
      const imgName = imgInput.files[0].name
      let found = false;
      const image = document.createElement('img');

      if (!found) {

        const testUrl = `/uploaded/${imgName}`;
        const windowBefore = document.getElementById("imageWindowBefore") as HTMLElement;

        //replace existing image                     
        let existingImg = windowBefore.querySelector("img.example") as HTMLImageElement

        if (existingImg) {
          existingImg.src = testUrl
        } else {
          //display uploaded
          image.classList.add("example")
          image.style.width = '500px';
          image.style.margin = '100px';
          image.style.marginLeft = '30%';
          image.src = testUrl;

          windowBefore.appendChild(image);
          found = true;
        }


      }

    } catch (error) {
      console.error('Error:', error);
    }
  });

  //resize uploaded image
  (document.getElementById("resizeFormUploaded") as HTMLFormElement).addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      (document.getElementById('upload') as HTMLElement).classList.add('show');

      // Get elements with proper null checks
      const imageInput = document.getElementById("imageInput") as HTMLInputElement | null;
      const widthInput = document.getElementById("imgWidth") as HTMLInputElement | null;
      const heightInput = document.getElementById("imgHeight") as HTMLInputElement | null;

      // Validate inputs exist
      if (!imageInput || !widthInput || !heightInput) {
        throw new Error("Required form elements not found");
      }

      // Get values
      const imageUploaded = imageInput.value;
      const imgWidth = widthInput.value;
      const imgHeight = heightInput.value;

      // Create body data
      const bodyData = {
        width1: parseInt(imgWidth),    // No .value needed - imgWidth is already the value
        height1: parseInt(imgHeight),  // No .value needed - imgHeight is already the value
        image: imageUploaded
      };

      if (!imgWidth || !imgHeight) {
        alert("Please choose width and height")
      }

      const response = await fetch("http://localhost:3000/api/server/resizeUploaded", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      })

      if (!response.ok) {
        throw new Error("cannot fetch 'resizeUploaded'")
      }

      const fullPath = (document.getElementById("imageInput") as HTMLInputElement).value;
      const fileName = fullPath.split("\\").pop();
      const resizedUrl = `/image/resized/resized-uploaded-gallery/${imgWidth}x${imgHeight}-${fileName}`;
      console.log(resizedUrl)
      let found = false;

      if (!found) {
        let imageAfter = document.createElement("img")
        const windowAfter = document.getElementById("imageWindowAfter") as HTMLElement
        let existingImg = windowAfter.querySelector("img.resized") as HTMLImageElement
        let resultHead = document.createElement("h1")
        windowAfter.appendChild(resultHead)

        //replace existing image
        if (existingImg) {
          existingImg.src = resizedUrl
        } else {
          //display resized uploaded
          resultHead.innerHTML = "Result🎇";
          imageAfter.src = resizedUrl;
          imageAfter.style.margin = '100px';
          imageAfter.style.marginLeft = '30%';
          imageAfter.classList.add("resized")
          windowAfter.appendChild(imageAfter)
          found = true
        }

        //add resized to gallery
        const gallery = document.getElementById("galleryResized");
        const imageInput = document.getElementById("imageInput") as HTMLInputElement | null;
        const fileName = imageInput?.files?.[0]?.name;

        if (!gallery || !fileName) {
          // Handle error case appropriately
          return;
        }

        const resizedUrlGallery = `/image/resized/resized-uploaded-gallery/${imgWidth}x${imgHeight}-${fileName}`;
        const resizedImage = document.createElement("img")

        resizedImage.src = resizedUrlGallery
        resizedImage.classList.add("example")
        resizedImage.classList.add("exampleUploaded")
        resizedImage.classList.add("imgex")
        gallery.appendChild(resizedImage)
        console.log("Image added to gallery successfully")

        let selectedImgSrcUploaded;
        const chooseImgs = document.querySelectorAll(".exampleUploaded"); // Select all elements with the class 'example'
        //style choosed
        chooseImgs.forEach((chooseImg) => {
          (chooseImg as HTMLImageElement).addEventListener("click", () => {
            chooseImgs.forEach((img) => {
              (img as HTMLImageElement).style.boxShadow = "none";
            });

            console.log("Image selected");
            (chooseImg as HTMLImageElement).style.boxShadow = "10px 10px 5px lightblue";
            (chooseImg as HTMLImageElement).style.transition = "box-shadow 0.5s ease";
            selectedImgSrcUploaded = (chooseImg as HTMLImageElement).src;
            console.log("Selected image:", selectedImgSrcUploaded);

          });
        });


      }
    } catch (error) {
      console.log(error);
    }
  })


  let selectedImgSrc: string | undefined;
  const chooseImgs = document.querySelectorAll(".example"); // Select all elements with the class 'example'

  chooseImgs.forEach((chooseImg) => {
    chooseImg.addEventListener("click", () => {
      chooseImgs.forEach((img) => {
        (img as HTMLImageElement).style.boxShadow = "none";
      });
      console.log("Image selected");
      (chooseImg as HTMLImageElement).style.boxShadow = "10px 10px 5px lightblue";
      (chooseImg as HTMLImageElement).style.transition = "box-shadow 0.5s ease";
      selectedImgSrc = (chooseImg as HTMLImageElement).src;
      console.log("Selected image:", selectedImgSrc);

    });
  });

  //resize image placeholder
  const resizeForm = document.getElementById("resizeForm");
  if (resizeForm instanceof HTMLFormElement) {
    resizeForm.addEventListener("submit", async (e) => {
      e.preventDefault();


      try {
        //define bodyData 
        const exImgs = document.querySelectorAll(".example");
        exImgs.forEach(async (exImg) => {
          exImg.addEventListener("click", async () => {
            console.log("Selected image:", selectedImgSrc);
          });
          if (!chooseImgs) {
            alert('please choose image')
          }

        });
        if (!selectedImgSrc) {
          console.error("selectedImgSrc is undefined");
          return;
        }

        const fileName = selectedImgSrc.split("/").pop() ?? "";
        const imgWdth = (document.getElementById("imgWdth") as HTMLInputElement).value;
        const imght = (document.getElementById("imght") as HTMLInputElement).value;
        const resizedFileName = `${imgWdth}x${imght}-${fileName}`;
        const resizedUrl = `/image/resized/resized-gallery/${resizedFileName}`;

        const checkResponse = await fetch(resizedUrl, { method: "HEAD" });

        if (checkResponse.ok) {
          // if there is the same image with same dimensions
          const displayDiv = document.getElementById("display") as HTMLElement;
          displayDiv.innerHTML = `
                <div class="cached-message">
                    <h2>This image Had been resized before </h2>
                    <img src="${resizedUrl}" style="max-width: 300px; margin: 15px 0; border-radius: 8px;">
                    <p>Dimensions:${imgWdth}x${imght}</p>
                    <a href="http://localhost:3000/image/resized/resized-gallery/${resizedFileName}" target="_blank">http://localhost:3000/image/resized/resized-gallery/${resizedFileName}</a>
                </div>
            `;
          return; //stop 
        }
        const displayDiv = document.getElementById("display") as HTMLElement;

        displayDiv.innerHTML = ``

        const bodyData = {
          width: parseInt(imgWdth),
          height: parseInt(imght),
          image: fileName
        }
        console.log(bodyData)
        if (!imgWdth || !imght) {
          alert("please choose width and height")
        }
        console.log(selectedImgSrc)
        //fetch resize route
        const response = await fetch('http://localhost:3000/api/server/resize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyData)

        })
        if (!response.ok) {
          throw new Error("cannot fetch 'http://localhost:3000/api/server/resize'")
        }



        if (!selectedImgSrc) {
          console.error("selectedImgSrc is undefined");
          return;
        }

        const resizedUrlDisplay = `/image/resized/resized-gallery/${imgWdth}x${imght}-${selectedImgSrc.split("/").pop()?.split("\\").pop() ?? ""}`; console.log(resizedUrlDisplay)
        let found = false;
        if (!found) {
          const displayImg = document.createElement("img")
          const displayDiv = document.getElementById("display") as HTMLElement
          let existingImg = displayDiv.querySelector("img.resized") as HTMLImageElement
          let resultHead = document.createElement("h1")
          displayDiv.appendChild(resultHead)

          //replace existing image
          if (existingImg) {
            existingImg.src = resizedUrlDisplay
          } else {
            //display resized uploaded
            resultHead.innerHTML = "Result🎇";
            displayImg.src = resizedUrlDisplay;
            displayImg.style.margin = '100px';
            displayImg.style.marginLeft = '30%';
            displayImg.classList.add("resized")
            displayDiv.appendChild(displayImg)
            found = true



          }
          //add resized to gallery
          const gallery = document.getElementById("gallery") as HTMLElement
          const resizedUrlGallery = resizedUrlDisplay
          const resizedImage = document.createElement("img")
          resizedImage.src = resizedUrlGallery
          resizedImage.classList.add("exampleUploaded")
          resizedImage.classList.add("example")
          resizedImage.classList.add("imgex")
          gallery.appendChild(resizedImage)
          console.log("Image added to gallery successfully")


          //choose image
          let selectedImgSrcGallery;
          const chooseImgs = document.querySelectorAll(".example"); // Select all elements with the class 'example'

          chooseImgs.forEach((chooseImg) => {
            chooseImg.addEventListener("click", () => {
              chooseImgs.forEach((img) => {
                (img as HTMLImageElement).style.boxShadow = "none";
              });
              console.log("Image selected");
              (chooseImg as HTMLImageElement).style.boxShadow = "10px 10px 5px lightblue";
              (chooseImg as HTMLImageElement).style.transition = "box-shadow 0.5s ease";
              selectedImgSrcGallery = (chooseImg as HTMLImageElement).src;
              console.log("Selected image from gallery placeholder:", selectedImgSrcGallery);

            });
          });



        }



      } catch (error) {
        console.log(error);
      }
    })

  }

  //resize from gallery
  (document.getElementById("resizeFormResized") as HTMLFormElement).addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      // Get the selected image from elements that already have the box shadow
      const selectedImg = document.querySelector(".exampleUploaded[style*='box-shadow']") as HTMLImageElement;

      if (!selectedImg) {
        alert("Please select an image first by clicking on it");
        return;
      }

      const selectedImgSrcUploaded = selectedImg.src;
      const imgWdth1 =(document.getElementById("imgWdth1") as HTMLInputElement).value
      const imght1 =(document.getElementById("imght1") as HTMLInputElement).value
      console.log("Selected image:", selectedImgSrcUploaded);

      if (!imgWdth1 || !imght1) {
        alert("Please choose width and height");
        return;
      }

      const fileName = selectedImgSrcUploaded.split("/").pop();
      const resizedFileName = `${imgWdth1}x${imght1}-${fileName}`;
      const resizedUrl = `/image/resized/resized-gallery/${resizedFileName}`;

      const checkResponse = await fetch(resizedUrl, { method: 'HEAD' });

      if (checkResponse.ok) {
        // if there is the same image with same dimensions
        const displayDiv = document.getElementById("displayResized") as HTMLElement;
        displayDiv.innerHTML = `
                <div class="cached-message">
                    <h2>This image Had been resized before </h2>
                    <img src="${resizedUrl}" style="max-width: 300px; margin: 15px 0; border-radius: 8px;">
                    <p>Dimensions:${imgWdth1}x${imght1}</p>
                    <a href="http://localhost:3000/image/resized/resized-gallery/${resizedFileName}" target="_blank">http://localhost:3000/image/resized/resized-gallery/${resizedFileName}</a>
                </div>
            `;
        return; //stop 
      }
      const displayDiv2 = document.getElementById("displayResized") as HTMLElement;

      displayDiv2.innerHTML = ``
      const bodyData = {
        width: parseInt(imgWdth1),
        height: parseInt(imght1),
        image: fileName
      };
      console.log("Request data:", bodyData);

      const response = await fetch('http://localhost:3000/api/server/resizeUploadedGallery', {
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
      const displayDiv = document.getElementById("displayResized") as HTMLElement;
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
      const gallery = document.getElementById("galleryResized") as HTMLElement;
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
            (img as HTMLImageElement).style.boxShadow = "none";
          });
          (chooseImg as HTMLImageElement).style.boxShadow = "10px 10px 5px lightblue";
          (chooseImg as HTMLImageElement).style.transition = "box-shadow 0.5s ease";
          selectedImgName = (chooseImg as HTMLImageElement).src;
          console.log("Selected image from gallery:", selectedImgName);

        });
      });



    } catch (error) {
    console.error("Error:", error);

    if (error instanceof Error) {
        alert("An error occurred: " + error.message);
    } else {
        alert("An unknown error occurred");
    }
}
  });
})