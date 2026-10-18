import React, { useState } from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import { createPost } from "../api/helpers";
import Compressor from "compressorjs";
import ListingForm from "./ListingForm/ListingForm";

const ListingPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageData, setImageData] = useState(null);
  const [contactType, setContactType] = useState("");
  const [contact, setContact] = useState("");
  const [contactTypeBackup, setContactTypeBackup] = useState("");
  const [content_backup, setContact_backup] = useState("");
  const [report_count, setReport_count] = useState(0);
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    // Check if the selected file is an image
    if (file && file.type.startsWith("image/")) {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success(result) {
          const reader = new FileReader();

          reader.readAsDataURL(result);
          reader.onload = (e) => {
            setImageData(e.target.result);
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    console.log(imageData);
    const postData = {
      name,
      description,
      price,
      image: imageData,
      contactType,
      contact,
      contactTypeBackup,
      contact_backup: content_backup,
      report_count,
      created_at: currentDate.toISOString(),
      location,
      categoryId,
      isActive,
      userId,
    };

    try {
      const response = await createPost(postData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant="h4">Create A Listing</Typography>
    </Box>
    <ListingForm />
  </>
  )
};

export default ListingPage;
