import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
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
  CardHeader,
  SvgIcon
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { fetchCompany, deleteCompanyById, fetchCompanyById } from "src/store/actionCreators/companyAction";
import { SeverityPill } from "src/components/severity-pill";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useRouter } from "next/navigation";  

export default function Company(props) {
  const dispatch = useDispatch();
  const { companies, company, isLoading } = useSelector(state => state.companyReducer);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const router = useRouter();
  const {
    count = 0,
    items = companies,
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

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);

  const deleteHandler = id => {
    dispatch(deleteCompanyById(id));
  };

  const createHandler = () => {
    router.push(`/create/company`, { scroll: false });
  };

  const editHandler = (id) => {
    dispatch(fetchCompanyById(id));
    router.push(`/edit/company/${id}`, { scroll: false });
  };

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  return (
    <div>
      <Button
        onClick={createHandler}
        className="mb-2"
        startIcon={
          <SvgIcon fontSize="small">
            <PlusIcon />
          </SvgIcon>
        }
        variant="contained"
      >
        Create
      </Button>
      <Card sx={{ paddingLeft: 2, width: 750 }}>
        <CardHeader title="Company Table" />
        <Scrollbar sx={{ flexGrow: 3 }}>
          <Box sx={{ maxWidth: 200 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell sortDirection="desc">Date</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Phone 2</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(company => {
                  // const isSelected = selected.includes(company.id);
                  // const createdAt = format(company.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                      hover
                      key={company.id}
                      // selected={isSelected}
                    >
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={company.avatar}>{getInitials(company.companyName)}</Avatar>
                          <Typography variant="subtitle2">{company.companyName}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                      <TableCell>{company.address}</TableCell>
                      <TableCell>{company.owner}</TableCell>
                      <TableCell>{company.phone}</TableCell>
                      <TableCell>{company.phone2}</TableCell>
                      <TableCell>
                      {/* <button
                        className="py-1 px-3 mb-2 rounded-full bg-yellow-500 hover:bg-yellow-600 font-semi-bold text-white text-l"
                        onClick={e => editHandler(company.id, e)}
                      >
                        Edit
                      </button> */}
                      <Button
                      variant="contained"
                      color="warning"
                      style={{ paddingLeft:"3px", paddingRight:"3px", paddingTop:"1px", paddingBottom:"1px", marginBottom:"2px" }}
                      onClick={e => editHandler(company.id, e)}
                    >
                      Edit
                    </Button>
                        {/* <button
                          className="py-1 px-3 mt-2 mb-2 rounded-full bg-red-500 hover:bg-red-600 font-semi-bold text-white text-l"
                          onClick={() => deleteHandler(company.id)}
                        >
                          Delete
                        </button> */}
                        <Button
                      variant="contained"
                      color="error"
                      style={{ paddingLeft:"3px", paddingRight:"3px", paddingTop:"1px", paddingBottom:"1px", marginBottom:"2px", marginTop:"2px" }}
                      onClick={() => deleteHandler(company.id)}
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
    </div>
  );
}

Company.propTypes = {
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

Company.getLayout = Company => <DashboardLayout>{Company}</DashboardLayout>;
