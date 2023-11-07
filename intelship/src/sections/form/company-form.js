import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
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
import { editCompanyAction } from "src/store/actionCreators/companyAction";
import { useRouter } from "next/navigation";

export default function CompanyForm() {
  const { company } = useSelector(state => state.companyReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState({
    companyName: "",
    address: "",
    owner: "",
    phone: "",
    phone2: ""
  });
  function companyHandler(e) {
    const { value, name } = e.target;
    const newCompany = {
      ...data
    };
    newCompany[name] = value;
    setData(newCompany);
  }

  const editHandler = e => {
    e.preventDefault();
    const pathSegments = window.location.pathname.split("/");
    const newId = pathSegments[3];
    dispatch(editCompanyAction(data, newId))
      .then(response => {
        Swal.fire({
          icon: "success",
          iconColor: "#57240f",
          title: "Edit Success!",
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
    <>
    <form onSubmit={editHandler}>
      <Stack spacing={3}>
        <span className="label-text text-lg">Company Name</span>
        <TextField
          label={company.companyName}
          name="companyName"
          type="text"
          value={data.companyName}
          onChange={companyHandler}
        />
      </Stack>
      <Stack spacing={3}>
        <span className="label-text text-lg">Address</span>
        <TextField
          label={company.address}
          name="address"
          type="text"
          value={data.address}
          onChange={companyHandler}
        />
      </Stack>
      <Stack spacing={3}>
        <span className="label-text text-lg">Owner</span>
        <TextField
          label={company.owner}
          name="owner"
          type="text"
          value={data.owner}
          onChange={companyHandler}
        />
      </Stack>
      <Stack spacing={3}>
        <span className="label-text text-lg">Phone</span>
        <TextField
          label={company.phone}
          name="phone"
          type="text"
          value={data.phone}
          onChange={companyHandler}
        />
      </Stack>
      <Stack spacing={3}>
        <span className="label-text text-lg">Phone 2</span>
        <TextField
          label={company.phone2}
          name="phone2"
          type="text"
          value={data.phone2}
          onChange={companyHandler}
        />
      </Stack>

      <Button size="large" sx={{ mt: 3 }} type="submit" variant="contained">
        Edit
      </Button>
      </form>
    </>
  );
}
