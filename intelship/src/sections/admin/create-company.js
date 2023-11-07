import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addCompanyAction } from "src/store/actionCreators/companyAction";
import Swal from "sweetalert2";

export const CreateCompany = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      address: "",
      owner: "",
      phone: "",
      phone2: "",
      submit: null
    },
    onSubmit: async (values, helpers) => {
      dispatch(addCompanyAction(values))
        .then(() => {
          router.push("/company");
        })
        .catch(err => {
          console.log(err);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        });
      router.push("/company");
      Link("/company");
    }
  });

  const [inputData, setInputData] = useState({
    companyName: "",
    address: "",
    owner: "",
    phone: "",
    phone2: ""
  });

  const inputHandler = e => {
    const { value, name } = e.target;
    const newInput = {
      ...inputData
    };
    newInput[name] = value;
    setInputData(newInput);
  };

  const addHandler = e => {
    e.preventDefault();
    dispatch(addCompanyAction(inputData))
      .then(response => {
        Swal.fire({
          icon: "success",
          iconColor: "#57240f",
          title: "Create Vessel Success!",
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831"
        });
        router.push("/company");
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          iconColor: "#57240f",
          title: "Error!",
          text: error.response.data.message,
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831"
        });
      });
  };
  return (
    <Box
      sx={{
        maxWidth: 800,
        px: 3,
        width: "100%"
      }}
      // display="flex"
      // flexDirection="column"
      // alignItems="center"
      // justifyContent="center"
    >
      <form onSubmit={addHandler}>
        <Stack spacing={3}>
          <TextField
            label="Company Name"
            name="companyName"
            onBlur={formik.handleBlur}
            type="text"
            value={inputData.companyName}
            onChange={inputHandler}
          />
          <TextField
            label="Address"
            name="address"
            onBlur={formik.handleBlur}
            type="text"
            value={inputData.address}
            onChange={inputHandler}
          />
          <TextField
            label="Owner"
            name="owner"
            onBlur={formik.handleBlur}
            type="text"
            value={inputData.owner}
            onChange={inputHandler}
          />
          <TextField
            label="Phone"
            name="phone"
            onBlur={formik.handleBlur}
            type="text"
            value={inputData.phone}
            onChange={inputHandler}
          />
          <TextField
            label="Phone 2"
            name="phone2"
            onBlur={formik.handleBlur}
            type="text"
            value={inputData.phone2}
            onChange={inputHandler}
          />
        </Stack>
        <Button
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          // onClick={handleContinue}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};
