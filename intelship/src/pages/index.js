import PropTypes from "prop-types";
// import { format } from 'date-fns';
import {
  Avatar,
  Button,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardHeader
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  fetchVessels,
  fetchVesselsInfo,
  fetchVesselsClient
} from "src/store/actionCreators/vesselAction";
import { SeverityPill } from "src/components/severity-pill";
import { useRouter } from "next/navigation";
import { deleteVesselById } from "src/store/actionCreators/vesselAction";

export default function Page(props) {
  const { vessels, vesselsClient, isLoading } = useSelector(state => state.vesselReducer);
  const role = localStorage.getItem("role");
  const companyName = localStorage.getItem("companyName");
  let kapal;
  if (role !== 'admin') {
    kapal = vesselsClient;
  } else {
    kapal = vessels;
  }
  const {
    count = 0,
    items = kapal,
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const statusMap = {
    // pending: 'warning',
    // delivered: 'success',
    // refunded: 'error'
    0: "success"
  };

  // useEffect(() => {
  //   // setLoading(true);
  //   // setTimeout(() => {
  //   //   setLoading(false);
  //   // }, 8000);
  //   dispatch(fetchVesselsClient(companyName));
  // }, []);

  useEffect(() => {
    setLoading(true);
    if (role !== 'admin') {
      dispatch(fetchVesselsClient(companyName));
    } else {
      dispatch(fetchVessels());
    }
    // setTimeout(() => {
    //   setLoading(false);
    // }, 8000);
    // dispatch(fetchVessels());
  }, []);

  useEffect(() => {
    dispatch(fetchVesselsInfo());
  }, [dispatch]);

  const detailHandler = (id, e) => {
    router.push(`/vesselmonitor/${id}`, { scroll: false });
  };

  const deleteHandler = id => {
    dispatch(deleteVesselById(id));
  };

  return (
    <Card sx={{ paddingLeft: 2, width: 1000 }}>
      <CardHeader title="Vessel Table" />
      <Scrollbar sx={{ flexGrow: 3 }}>
        <Box sx={{ maxWidth: 200 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={event => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Vessel Name</TableCell>
                <TableCell sortDirection="desc">Date</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Device</TableCell>
                <TableCell>Status Power</TableCell>
                <TableCell>Tank 1</TableCell>
                <TableCell>Tank 2</TableCell>
                <TableCell>Tank 3</TableCell>
                <TableCell>Tank 4</TableCell>
                <TableCell>Tank 5</TableCell>
                <TableCell>Tank 6</TableCell>
                <TableCell>Tank 7</TableCell>
                <TableCell>Tank 8</TableCell>
                <TableCell>Tank Total</TableCell>
                <TableCell>RPM Left</TableCell>
                <TableCell>RPM Right</TableCell>
                <TableCell>Speed</TableCell>
                <TableCell>Trim</TableCell>
                <TableCell>List</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(vessel => {
                // const isSelected = selected.includes(vessel.id);
                // const createdAt = format(vessel.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={vessel.id}
                    // selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        // checked={isSelected}
                        onChange={event => {
                          if (event.target.checked) {
                            onSelectOne?.(vessel.id);
                          } else {
                            onDeselectOne?.(vessel.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={vessel.avatar}>{getInitials(vessel.name)}</Avatar>
                        <Typography variant="subtitle2">{vessel.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{vessel.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{vessel.companyName}</TableCell>
                    <TableCell>{vessel.deviceId}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[vessel.statusPower]}>
                        {vessel.statusPower}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{vessel.fuelTank1}</TableCell>
                    <TableCell>{vessel.fuelTank2}</TableCell>
                    <TableCell>{vessel.fuelTank3}</TableCell>
                    <TableCell>{vessel.fuelTank4}</TableCell>
                    <TableCell>{vessel.fuelTank5}</TableCell>
                    <TableCell>{vessel.fuelTank6}</TableCell>
                    <TableCell>{vessel.fuelTank7}</TableCell>
                    <TableCell>{vessel.fuelTank8}</TableCell>
                    <TableCell>
                      {vessel.fuelTank1 +
                        vessel.fuelTank2 +
                        vessel.fuelTank3 +
                        vessel.fuelTank4 +
                        vessel.fuelTank5 +
                        vessel.fuelTank6 +
                        vessel.fuelTank7 +
                        vessel.fuelTank8 +
                        " KL"}
                    </TableCell>
                    <TableCell>{vessel.RPM1}</TableCell>
                    <TableCell>{vessel.RPM2}</TableCell>
                    <TableCell>{vessel.speed + " Knot"}</TableCell>
                    <TableCell>{vessel.pitch}</TableCell>
                    <TableCell>{vessel.roll}</TableCell>
                    <TableCell>
                      {/* <button
                        className="py-1 px-3 mb-2 rounded-full bg-blue-500 hover:bg-blue-600 font-semi-bold text-white text-l"
                        onClick={e => detailHandler(vessel.id, e)}
                      >
                        Detail
                      </button> */}
                      <Button
                      variant="contained"
                      color="warning"
                      onClick={e => detailHandler(vessel.id, e)}
                      style={{ paddingLeft:"3px", paddingRight:"3px", paddingTop:"1px", paddingBottom:"1px", marginBottom:"2px" }}
                    >
                      Detail
                    </Button>
                      {/* <button
                        className="py-1 px-3 mt-2 mb-2 rounded-full bg-red-500 hover:bg-red-600 font-semi-bold text-white text-l"
                        onClick={() => deleteHandler(vessel.id)}
                      >
                        Delete
                      </button> */}
                      <Button
                      variant="contained"
                      color="error"
                      style={{ paddingLeft:"3px", paddingRight:"3px", paddingTop:"1px", paddingBottom:"1px", marginBottom:"2px", marginTop:"2px" }}
                      onClick={() => deleteHandler(vessel.id)}
                    >
                      Delete
                    </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

Page.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};

Page.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;
