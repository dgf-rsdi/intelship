import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { registerUser } from "../../store/actionCreators/userAction";
import { useDispatch } from "react-redux";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      role: "",
      companyName: "",
      fullname: "",
      submit: null
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(255)
        .required("Username is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string()
        .max(255)
        .required("Password is required"),
      phone: Yup.string()
        .max(255)
        .required("Phone is required"),
      address: Yup.string()
        .max(255)
        .required("Address is required"),
      role: Yup.string()
        .max(255)
        .required("Role is required"),
      companyName: Yup.string()
        .max(255)
        .required("Company Name is required"),
      fullname: Yup.string()
        .max(255)
        .required("Fullname is required")
    }),
    onSubmit: async (values, helpers) => {
      dispatch(registerUser(values))
        .then(() => {
          router.push("/");
        })
        .catch(err => {
          console.log(err);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        });
      // await auth.signIn(values.email, values.password);
      router.push("/");
      Link("/");
    }
  });

  return (
    <>
      <Head>
        <title>Register | Intelship</title>
      </Head>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%"
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label="Username"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.username}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={!!(formik.touched.fullname && formik.errors.fullname)}
                  fullWidth
                  helperText={formik.touched.fullname && formik.errors.fullname}
                  label="Fullname"
                  name="fullname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.fullname}
                />
                {/* <TextField
                  error={!!(formik.touched.companyName && formik.errors.companyName)}
                  fullWidth
                  helperText={formik.touched.companyName && formik.errors.companyName}
                  label="Company Name"
                  name="companyName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.companyName}
                /> */}
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
                    <MenuItem value={'RSDI'}>RSDI</MenuItem>
                    <MenuItem value={'PT.JAYA SAMUDRA TEKNOLOGI'}>PT.JAYA SAMUDRA TEKNOLOGI</MenuItem>
                    <MenuItem value={'PT.MARINDO'}>PT.MARINDO</MenuItem>
                  </Select>
                </FormControl>
                {/* <TextField
                  error={!!(formik.touched.role && formik.errors.role)}
                  fullWidth
                  helperText={formik.touched.role && formik.errors.role}
                  label="Role"
                  name="role"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.role}
                /> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    error={!!(formik.touched.role && formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                    label="Role"
                    name="role"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.role}
                  >
                    <MenuItem value={'customer'}>customer</MenuItem>
                    <MenuItem value={'admin'}>admin</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone device"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.phone}
                />
                <TextField
                  error={!!(formik.touched.address && formik.errors.address)}
                  fullWidth
                  helperText={formik.touched.address && formik.errors.address}
                  label="Address"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.address}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Register
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = page => <AuthLayout>{page}</AuthLayout>;

export default Page;
