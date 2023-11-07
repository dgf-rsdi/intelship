import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  ListItem,
  List,
  ListItemText,
  Button,
  Unstable_Grid2 as Grid
} from "@mui/material";
import Image from "next/image";
import Tanki from "../../assets/images/tankiruby.jpg";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchVesselById } from "src/store/actionCreators/vesselAction";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox } from "@mui/material";

export const ShipInfo = () => {
  const dispatch = useDispatch();
  const { vessel, isLoading } = useSelector(state => state.vesselReducer);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isChecked7, setIsChecked7] = useState(false);
  const [isChecked8, setIsChecked8] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const newId = pathSegments[2];
    // console.log(newId);
    setId(newId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
    dispatch(fetchVesselById(newId));
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = () => {
    // Logika atau tindakan yang ingin Anda lakukan ketika tombol ditekan
    console.log("Tombol ditekan!");
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleButtonClick2 = () => {
    // Logika atau tindakan yang ingin Anda lakukan ketika tombol ditekan
    console.log("Tombol ditekan!");
  };

  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handleButtonClick3 = () => {
    // Logika atau tindakan yang ingin Anda lakukan ketika tombol ditekan
    console.log("Tombol ditekan!");
  };

  const handleCheckboxChange4 = () => {
    setIsChecked4(!isChecked4);
  };

  const handleButtonClick4 = () => {
    // Logika atau tindakan yang ingin Anda lakukan ketika tombol ditekan
    console.log("Tombol ditekan!");
  };

  const handleCheckboxChange5 = () => {
    setIsChecked5(!isChecked5);
  };

  const handleButtonClick5 = () => {
    // Logika atau tindakan yang ingin Anda lakukan ketika tombol ditekan
    console.log("Tombol ditekan!");
  };

  const handleCheckboxChange6 = () => {
    setIsChecked6(!isChecked6);
  };

  const handleButtonClick6 = () => {
    // Logika atau tindakan yang ingin Anda lakukan ketika tombol ditekan
    console.log("Tombol ditekan!");
  };

  const handleCheckboxChange7 = () => {
    setIsChecked7(!isChecked7);
  };

  const handleButtonClick7 = () => {
    // Logika atau tindakan yang ingin Anda lakukan ketika tombol ditekan
    console.log("Tombol ditekan!");
  };

  const handleCheckboxChange8 = () => {
    setIsChecked8(!isChecked8);
  };

  const handleButtonClick8 = () => {
    // Logika atau tindakan yang ingin Anda lakukan ketika tombol ditekan
    console.log("Tombol ditekan!");
  };

  const handleEditClick = () => {
    setShowEditOptions(!showEditOptions);
  };

  const updatedAt = vessel?.updatedAt;
  var tanggalAwal = new Date(updatedAt);
  function tambahkanNol(angka) {
    return angka < 10 ? "0" + angka : angka;
  }
  var tanggal = tambahkanNol(tanggalAwal.getDate());
var bulan = tambahkanNol(tanggalAwal.getMonth() + 1); // Ingat bulan dimulai dari 0
var tahun = tanggalAwal.getFullYear();
var jam = tambahkanNol(tanggalAwal.getUTCHours());
var menit = tambahkanNol(tanggalAwal.getUTCMinutes());
var detik = tambahkanNol(tanggalAwal.getUTCSeconds());
var hasilAkhir = tanggal + "-" + bulan + "-" + tahun + " " + jam + ":" + menit + ":" + detik;
  return (
    <Grid container spacing={2}>
      <Stack sx={{ px: 2 }}>
        <Card sx={{ maxWidth: 450 }}>
          <CardHeader title="Info Kapal" />
          <Divider />
          <CardContent className="flex">
            <Stack spacing={3} sx={{ width: 450 }}>
              <List>
                <ListItem>
                  <ListItemText primary={`Date Terakhir: ${hasilAkhir}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`IMEI: ${vessel.imei}`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="imei"
                      label="imei"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Nama Kapal: ${vessel.name}`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="namaKapal"
                      label="Nama Kapal"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Pemilik: ${vessel.companyName}`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="pemilik"
                      label="Pemilik"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Faktor pembagi RPM 1`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="faktorPembagiRPM1"
                      label="Faktor Pembagi RPM 1"
                      type="number"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Faktor pembagi RPM 2`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="FaktorPembagiRPM2"
                      label="Faktor Pembagi RPM 2"
                      type="number"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Faktor pembagi DFM 1`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="FaktorPembagiDFM1"
                      label="Faktor Pembagi DFM 1"
                      type="number"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Faktor pembagi DFM 2`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="FaktorPembagiDFM2"
                      label="Faktor Pembagi DFM 2"
                      type="number"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Offset Trim`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="Offset Trim"
                      label="Offset Trim"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Offset List`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="Offset List"
                      label="Offset List"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Nomor Telpon`} />
                  {showEditOptions && (
                    <TextField
                      autoFocus
                      margin="dense"
                      id="phone"
                      label="Phone Number"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Tanki 1`} />
                  {showEditOptions && (
                    <Checkbox checked={isChecked} onChange={handleCheckboxChange} color="primary" />
                  )}
                  {showEditOptions && <ListItemText primary={`Yes/No`} />}
                  {showEditOptions && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick}
                      disabled={!isChecked}
                    >
                      Setting
                    </Button>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Tanki 2`} />
                  {showEditOptions && (
                    <Checkbox
                      checked={isChecked2}
                      onChange={handleCheckboxChange2}
                      color="primary"
                    />
                  )}
                  {showEditOptions && <ListItemText primary={`Yes/No`} />}
                  {showEditOptions && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick2}
                      disabled={!isChecked2}
                    >
                      Setting
                    </Button>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Tanki 3`} />
                  {showEditOptions && (
                    <Checkbox
                      checked={isChecked3}
                      onChange={handleCheckboxChange3}
                      color="primary"
                    />
                  )}
                  {showEditOptions && <ListItemText primary={`Yes/No`} />}
                  {showEditOptions && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick3}
                      disabled={!isChecked3}
                    >
                      Setting
                    </Button>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Tanki 4`} />
                  {showEditOptions && (
                    <Checkbox
                      checked={isChecked4}
                      onChange={handleCheckboxChange4}
                      color="primary"
                    />
                  )}
                  {showEditOptions && <ListItemText primary={`Yes/No`} />}
                  {showEditOptions && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick4}
                      disabled={!isChecked4}
                    >
                      Setting
                    </Button>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Tanki 5`} />
                  {showEditOptions && (
                    <Checkbox
                      checked={isChecked5}
                      onChange={handleCheckboxChange5}
                      color="primary"
                    />
                  )}
                  {showEditOptions && <ListItemText primary={`Yes/No`} />}
                  {showEditOptions && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick5}
                      disabled={!isChecked5}
                    >
                      Setting
                    </Button>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Tanki 6`} />
                  {showEditOptions && (
                    <Checkbox
                      checked={isChecked6}
                      onChange={handleCheckboxChange6}
                      color="primary"
                    />
                  )}
                  {showEditOptions && <ListItemText primary={`Yes/No`} />}
                  {showEditOptions && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick6}
                      disabled={!isChecked6}
                    >
                      Setting
                    </Button>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Tanki 7`} />
                  {showEditOptions && (
                    <Checkbox
                      checked={isChecked7}
                      onChange={handleCheckboxChange7}
                      color="primary"
                    />
                  )}
                  {showEditOptions && <ListItemText primary={`Yes/No`} />}
                  {showEditOptions && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick7}
                      disabled={!isChecked7}
                    >
                      Setting
                    </Button>
                  )}
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Tanki 8`} />
                  {showEditOptions && (
                    <Checkbox
                      checked={isChecked8}
                      onChange={handleCheckboxChange8}
                      color="primary"
                    />
                  )}
                  {showEditOptions && <ListItemText primary={`Yes/No`} />}
                  {showEditOptions && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleButtonClick8}
                      disabled={!isChecked8}
                    >
                      Setting
                    </Button>
                  )}
                </ListItem>
              </List>
            </Stack>
          </CardContent>
          <Divider />
          {/* <Button variant="outlined" onClick={handleClickOpen} className="flex justify-end">
            Edit
          </Button> */}
          <Button variant="outlined" onClick={handleEditClick} className="flex justify-end">
            {showEditOptions ? "Save Changes" : "Edit"}
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Save Changes</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="namaKapal"
                label="Nama Kapal"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="pemilik"
                label="Pemilik"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="faktorPembagiRPM1"
                label="Faktor Pembagi RPM 1"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="FaktorPembagiRPM2"
                label="Faktor Pembagi RPM 2"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="FaktorPembagiDFM1"
                label="Faktor Pembagi DFM 1"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="FaktorPembagiDFM1"
                label="Faktor Pembagi DFM 2"
                type="number"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="imei"
                label="imei"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="Offset Trim"
                label="Offset Trim"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="Offset List"
                label="Offset List"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone Number"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="tanki1"
                label="Tipe Tanki 1"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="tanki2"
                label="Tipe Tanki 2"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="tanki3"
                label="Tipe Tanki 3"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="tanki4"
                label="Tipe Tanki 4"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="tanki5"
                label="Tipe Tanki 5"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="tanki6"
                label="Tipe Tanki 6"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="tanki7"
                label="Tipe Tanki 7"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="tanki8"
                label="Tipe Tanki 8"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Save Changes</Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Stack>
      <Stack sx={{ px: 2 }}>
        <Card sx={{ maxWidth: 450 }}>
          <CardHeader title="Layout Tanki Bahan Bakar" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ width: 450 }}>
              <List>
                <ListItem>
                  <Image src={Tanki} height={400} width={140} />
                </ListItem>
              </List>
            </Stack>
          </CardContent>
          <Divider />
        </Card>
      </Stack>
    </Grid>
  );
};
