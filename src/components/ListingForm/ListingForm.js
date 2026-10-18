import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
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
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      addInContact: false, // Setting default value for addInContact
    },
  });
  const watchAddInContact = watch("addInContact");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = (e) => {
            setValue("imageData", e.target.result);
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  const onSubmit = async (data) => {
    const currentDate = new Date();
    data.created_at = currentDate.toISOString();
    console.log(data)
    try {
      const response = await createPost(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={{ px: 5 }}>
        <TextField
          label="Product Name *"
          {...register("name")}
          fullWidth
          margin="normal"
          color="secondary"
        />
        <TextField type="file" {...register("image")} />
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
        <TextField
          label="Description"
          {...register("description")}
          multiline
          fullWidth
          margin="normal"
          color="secondary"
        />
        <TextField
          label="Price"
          type="number"
          {...register("price")}
          fullWidth
          margin="normal"
          color="secondary"
        />
        <Box sx={{ py: 3 }}>
          <Typography variant="h6" sx={{ pb: 1 }}>
            Contact Fields:
          </Typography>
          <Typography variant="h6" sx={{ pb: 1, fontSize: 14, fontWeight: 400 }}>
            Select your preferred method of messaging.
          </Typography>

          <FormControl color="secondary" fullWidth>
            <InputLabel id="">Contact Type</InputLabel>
            <Select
              {...register("contactType")}
              label="Contact Type"
            >
              <MenuItem value={10}>Email</MenuItem>
              <MenuItem value={20}>Instagram</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Contact"
            {...register("contact")}
            fullWidth
            margin="normal"
            color="secondary"
          />
        </Box>
        <Box>
          <Typography
            onClick={() => setValue("addInContact", !watchAddInContact)}
            display="inline-flex"
            alignItems="center"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {watchAddInContact ? (
              <RemoveCircleOutlineIcon />
            ) : (
              <AddCircleOutlineIcon />
            )}
            Additional Contact Field?
          </Typography>
        </Box>
        {watchAddInContact && (
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
                {...register("contactTypeBackup")}
                label="Backup Contact Type"
              >
                <MenuItem value={10}>Email</MenuItem>
                <MenuItem value={20}>Instagram</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Backup Contact"
              {...register("content_backup")}
              fullWidth
              margin="normal"
              color="secondary"
            />
          </Box>
        )}

        <TextField
          label="Location (optional)"
          {...register("location")}
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
    </form>
  );
};

export default ListingForm;
