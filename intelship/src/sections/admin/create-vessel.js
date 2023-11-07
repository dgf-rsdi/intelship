import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useDispatch } from "react-redux";
import { addVesselAction } from "src/store/actionCreators/vesselAction";
import Swal from "sweetalert2";

export const CreateVessel = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      productionYear: 0,
      companyName: "",
      phoneNumber: "",
      submit: null
    },
    // validationSchema: Yup.object({
    //   email: Yup
    //     .string()
    //     .email('Must be a valid email')
    //     .max(255)
    //     .required('Email is required'),
    //   password: Yup
    //     .string()
    //     .max(255)
    //     .required('Password is required')
    // }),
    onSubmit: async (values, helpers) => {
      dispatch(addVesselAction(values))
        .then(() => {
          router.push("/");
        })
        .catch(err => {
          console.log(err);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        });
      router.push("/");
      Link("/");
    }
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/");
  }, [auth, router]);

  const handleContinue = useCallback(() => {
    // auth.skip();
    router.push("/");
  }, [auth, router]);

  const [inputData, setInputData] = useState({
    name: "",
    productionYear: Number,
    companyName: "",
    phoneNumber: ""
  });

  const inputHandler = e => {
    const { value, name } = e.target;
    const newInput = {
      ...inputData
    };
    newInput[name] = value;
    setInputData(newInput);
  };

  const loginHandler = e => {
    e.preventDefault();
    dispatch(addVesselAction(inputData))
      .then(response => {
        Swal.fire({
          icon: "success",
          iconColor: "#57240f",
          title: "Create Vessel Success!",
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831"
        });
        router.push("/");
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
      <form onSubmit={loginHandler}>
        <Stack spacing={3}>
          <TextField
            label="Vessel Name"
            name="name"
            onBlur={formik.handleBlur}
            type="text"
            value={inputData.name}
            onChange={inputHandler}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Company Name</InputLabel>
            <Select
              error={!!(formik.touched.companyName && formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
              label="Company Name"
              name="companyName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.companyName}
            >
              <MenuItem value={"RSDI"}>RSDI</MenuItem>
              <MenuItem value={"PT.JAYA SAMUDRA TEKNOLOGI"}>PT.JAYA SAMUDRA TEKNOLOGI</MenuItem>
              <MenuItem value={"PT.MARINDO"}>PT.MARINDO</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            onBlur={formik.handleBlur}
            type="text"
            value={inputData.phoneNumber}
            onChange={inputHandler}
          />
          <TextField
            label="Production Year"
            name="productionYear"
            onBlur={formik.handleBlur}
            type="text"
            value={inputData.productionYear}
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
