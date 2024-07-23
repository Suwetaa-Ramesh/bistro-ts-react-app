import { useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../constants";
import FormikTextField from "../../components/FormikTextField";
import {
  yupValidationSchema,
  formikTextFields,
  BISTRO_FORM_TYPE,
} from "./formConstants";

type Props = {
  type: BISTRO_FORM_TYPE;
};

const AddEditBistro = ({ type }: Props) => {
  const navigate = useNavigate();
  const { id: bistroId } = useParams();

  useEffect(() => {
    if (type === BISTRO_FORM_TYPE.EDIT && bistroId) {
      try {
        axios
          .get(`${api.bistros}${bistroId}`)
          .then(
            (res: { data: { name: any; description: any; location: any } }) => {
              const { name, description, location } = res.data;
              setBistro({ name, description, location });
            }
          );
      } catch (error) {
        console.error(error);
      }
    }
  }, [type, bistroId]);

  const [bistro, setBistro] = useState({
    name: "",
    description: "",
    location: "",
  });

  const handleSubmit = async ({
    name,
    description,
    location,
  }: {
    name: string;
    description: string;
    location: string;
  }) => {
    let reqBody = {
      name,
      description,
      location,
    };
    try {
      if (type === BISTRO_FORM_TYPE.ADD) {
        await axios.post(api.bistros, reqBody);
        window.alert("Bistro was created successfully");
      } else {
        await axios.put(`${api.bistros}${bistroId}`, reqBody);
        window.alert("Bistro was edited successfully");
      }
      navigate("/bistros");
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: bistro,
    enableReinitialize: true,
    validationSchema: yupValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box>
      <Typography variant="h4">
        {type === "add" ? "Add a" : "Edit"} bistro
      </Typography>

      <Box sx={{ my: 2, maxWidth: 600 }}>
        <form
          onSubmit={(e: { preventDefault: () => void }) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <Stack rowGap={2}>
            {formikTextFields.map(({ field, label, multiline, rows }) => {
              return (
                <FormikTextField
                  key={field}
                  field={field}
                  label={label}
                  formik={formik}
                  multiline={multiline}
                  rows={rows}
                />
              );
            })}
          </Stack>

          <Stack direction={"row"} columnGap={2} sx={{ mt: 2 }}>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
            <Button color="error" component="a" href="/bistros">
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddEditBistro;
