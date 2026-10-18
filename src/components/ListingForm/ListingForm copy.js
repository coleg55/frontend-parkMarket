import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { createPost } from "../../api/helpers";
import Compressor from "compressorjs";

const ListingForm = () => {
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

  const [addInContact, setAddInContact] = useState(false);

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
    <FormControl sx={{ px: 5 }} onSubmit={handleSubmit}>
      <TextField
        label="Product Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        color="secondary"
      />
      <TextField type="file" />
      <Button variant="contained" color="primary" component="span">
        Upload
      </Button>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        fullWidth
        margin="normal"
        color="secondary"
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        color="secondary"
      />
      <Box sx={{ py: 3 }}>
        <Typography variant="h6" sx={{ pb: 1 }}>
          Contact Fields:
        </Typography>
        <Typography variant="h6" sx={{ pb: 1, fontSize: 14, fontWeight: 400 }}>
          Select your preffered method of messaging.
        </Typography>

        <FormControl color="secondary" fullWidth>
          <InputLabel id="">Contact Type</InputLabel>
          <Select
            value={contactType}
            label="Contact Type"
            onChange={(e) => setContactType(e.target.value)}
          >
            <MenuItem value={10}>Email</MenuItem>
            <MenuItem value={20}>Instagram</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          fullWidth
          margin="normal"
          color="secondary"
        />
      </Box>
      <Box>
        <Typography
          onClick={() => setAddInContact(!addInContact)}
          display="inline-flex"
          alignItems="center"
          sx={{
            "&:hover": {
              // Applying styles on hover
              cursor: "pointer", // Changing cursor to pointer on hover
            },
          }}
        >
          {addInContact ? (
            <RemoveCircleOutlineIcon />
          ) : (
            <AddCircleOutlineIcon />
          )}
          Additional Contact Field?
        </Typography>
      </Box>
      {addInContact === true ? (
        <Box sx={{ py: 3 }}>
          <Typography variant="h6" sx={{ pb: 1 }}>
            Backup Fields:
          </Typography>
          <Typography
            variant="h6"
            sx={{ pb: 1, fontSize: 14, fontWeight: 400 }}
          >
            Select your secondary method of messaging.
          </Typography>

          <FormControl color="secondary" fullWidth>
            <InputLabel id="">Backup Contact Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={contactTypeBackup}
              label="Backup Contact Type"
              onChange={(e) => setContactTypeBackup(e.target.value)}
            >
              <MenuItem value={10}>Email</MenuItem>
              <MenuItem value={20}>Instagram</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Backup Contact"
            value={content_backup}
            onChange={(e) => setContact_backup(e.target.value)}
            fullWidth
            margin="normal"
            color="secondary"
          />
        </Box>
      ) : null}

      <TextField
        label="Location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
        color="secondary"
        required={false}
      />

      <input type="file" id="image-upload" onChange={handleImageUpload} />
      <Button type="submit" variant="contained" color="primary">
        Create listing
      </Button>
    </FormControl>
  );
};

export default ListingForm;
