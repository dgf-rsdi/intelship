import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useEffect, React } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Loading from "../Loading";
import { fetchVesselsInfo } from "src/store/actionCreators/vesselAction";

const statusMap = {
  // pending: 'warning',
  // delivered: 'success',
  // refunded: 'error'
  0: 'success'
};

export default function OverviewLatestOrders() {
  // const { sx } = props;
  const dispatch = useDispatch();
  const { vesselInfo, isLoading } = useSelector((state) => state.vesselReducer)

  // useEffect(() => {
  //   dispatch(fetchVesselsInfo())
  // }, [dispatch])

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Summary Vessel Data" />
      <Scrollbar sx={{ flexGrow: 3 }}>
        <Box sx={{ minWidth: 800, overflowY: "scroll", maxWeight: "500px"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Vessel Name
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Status Power
                </TableCell>
                <TableCell>
                  Tank 1
                </TableCell>
                <TableCell>
                  Tank 2
                </TableCell>
                <TableCell>
                  Tank 3
                </TableCell>
                <TableCell>
                  Tank 4
                </TableCell>
                <TableCell>
                  Tank 5
                </TableCell>
                <TableCell>
                  Tank 6
                </TableCell>
                <TableCell>
                  Tank 7
                </TableCell>
                <TableCell>
                  Tank 8
                </TableCell>
                <TableCell>
                  Tank Total
                </TableCell>
                <TableCell>
                  RPM Left
                </TableCell>
                <TableCell>
                  RPM Right
                </TableCell>
                <TableCell>
                  Speed
                </TableCell>
                <TableCell>
                  Trim
                </TableCell>
                <TableCell>
                  List
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vesselInfo.map((vessel) => {
                // const createdAt = format(vessel.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={vessel.id}
                  >
                    <TableCell>
                      {vessel.deviceId}
                    </TableCell>
                    <TableCell>
                      {vessel.createdAt.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[vessel.statusPower]}>
                      {vessel.statusPower}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      {vessel.fuelTank1}
                    </TableCell>
                    <TableCell>
                      {vessel.fuelTank2}
                    </TableCell>
                    <TableCell>
                      {vessel.fuelTank3}
                    </TableCell>
                    <TableCell>
                      {vessel.fuelTank4}
                    </TableCell>
                    <TableCell>
                      {vessel.fuelTank5}
                    </TableCell>
                    <TableCell>
                      {vessel.fuelTank6}
                    </TableCell>
                    <TableCell>
                      {vessel.fuelTank7}
                    </TableCell>
                    <TableCell>
                      {vessel.fuelTank8}
                    </TableCell>
                    <TableCell>
                      {(vessel.fuelTank1 + vessel.fuelTank2 + vessel.fuelTank3 + vessel.fuelTank4 + vessel.fuelTank5 + vessel.fuelTank6 + vessel.fuelTank7 + vessel.fuelTank8) + ' KL'}
                    </TableCell>
                    <TableCell>
                      {vessel.RPM1}
                    </TableCell>
                    <TableCell>
                      {vessel.RPM2}
                    </TableCell>
                    <TableCell>
                      {vessel.speed + ' Knot'}
                    </TableCell>
                    <TableCell>
                      {vessel.pitch}
                    </TableCell>
                    <TableCell>
                      {vessel.roll}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
    // <></>
  );
};

// OverviewLatestOrders.prototype = {
//   vesselInfo: PropTypes.array,
//   sx: PropTypes.object
// };
