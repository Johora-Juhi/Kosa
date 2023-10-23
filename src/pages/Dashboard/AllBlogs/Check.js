import { format } from "date-fns";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Check = () => {
  const [imageURL, setImageURL] = useState(null); // State to hold the image URL
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const previousImage = "kuchbhi";
  useEffect(() => {
    console.log(imageURL);
  }, [imageURL])
  const handleCheck = (event) => {
    event.preventDefault();

    const imageValue = event.target.image.files[0]; // Get the selected image file

    if (imageValue) {
      // If an image is selected, upload it to ImgBB
      const formData = new FormData();
      formData.append("image", imageValue);

      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success) {
            const image = imgData.data.url;
            setImageURL(() => {
              console.log(image); // Log the updated imageURL within the updater function
              return image; // Update the state with the uploaded image URL
            });
          }
        });
    } else {
      setImageURL(() => {
        console.log(previousImage); // Log the previousImage within the updater function
        return previousImage; // Keep the previously uploaded image URL or set a variable
      });
    }
    console.log(imageURL);
  };
  return (
    <div>
      <form
        className=" py-5 px-4 rounded"
        style={{
          border: "1px solid #e2e2e2",
        }}
        onSubmit={handleCheck}
      >
        <div
          style={{ border: "1px solid #e2e2e2" }}
          className="form-control p-0"
        >
          <input
            id="image"
            name="image"
            style={{
              border: "1px solid #e2e2e2",
            }}
            type="file"
            className="form-control form-control-md "
          />
        </div>

        <input
          className="mt-3 bg-black text-white px-5 py-2 rounded"
          value="Add Blog"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Check;
