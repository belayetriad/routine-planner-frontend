import apiRequest from "@/utils/axios-config";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function ClassComponent() {
  const currentWarehouseId = Cookies.get("currentWarehouseId");
  const defaultData = {
    name: "",
    startTime: "",
    priority: Number,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    startTime: Yup.string().required("Time is required"),
    priority: Yup.number().required("Priority is required"),
  });

  // states
  const [editDataId, setEditDataId] = useState<null | string>(null);
  const [listData, setListData] = useState<any>([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        if (editDataId) {
          await apiRequest.put(`/class/${editDataId}`, values);
        } else {
          await apiRequest.post("/class", values);
        }

        Swal.fire({
          title: "Action Successful!",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        onClear();
        getList(page);
      } catch (error: any) {
        Swal.fire({
          title: error?.response?.statusText
            ? error?.response?.statusText
            : "Something Wrong!",
          icon: "error",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    },
  });

  const getList = async (pageNumber: number) => {
    try {
      const res = await apiRequest.get(`/class`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getList(page);
  }, [page]);

  const onEdit = (id: string) => {
    setEditDataId(id);
    const editData = listData.find((data: any) => data["_id"] === id);
    if (editData) {
      formik.setValues({
        warehouseId: editData?.warehouseId?._id,
        name: editData?.name,
        type: editData.type,
        status: editData.isActive,
      });
    }
  };

  const onClear = () => {
    formik.resetForm();
    setEditDataId(null);
  };

  return (
    <>
      {/* card body */}
      <Card>
        <div style={{ display: "inline-flex" }}>
          <IconButton onClick={toggleFormVisibility} style={{ marginLeft: 2 }}>
            {isFormVisible ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
          <CardHeader title="Stores" titleTypographyProps={{ variant: "h6" }} />
        </div>

        <Divider style={{ margin: 0 }} />

        <Collapse in={isFormVisible}>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Grid container spacing={5} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Class Name"
                    name="name"
                    placeholder="Enter Class Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={
                      formik.touched.name && Boolean(formik.errors.name)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    type="text"
                    label="Class Start Time"
                    name="startTime"
                    placeholder="Enter Class Name"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.startTime &&
                      Boolean(formik.errors.startTime)
                    }
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={5} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Class Name"
                    name="name"
                    placeholder="Enter Class Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={
                      formik.touched.name && Boolean(formik.errors.name)
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Class Start Time"
                    name="startTime"
                    placeholder="Enter Class Name"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.startTime &&
                      Boolean(formik.errors.startTime)
                    }
                    helperText={
                      formik.touched.startTime &&
                      Boolean(formik.errors.startTime)
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>

            <Divider style={{ margin: 0 }} />
            <CardActions style={{ justifyContent: "right" }}>
              <Button
                size="large"
                type="submit"
                style={{ marginRight: 2 }}
                variant="contained"
                disabled={formik.isSubmitting}
              >
                {editDataId ? "Update" : "Save"}
              </Button>
              <Button
                size="large"
                color="secondary"
                variant="outlined"
                onClick={() => {
                  onClear();
                }}
              >
                Clear
              </Button>
            </CardActions>
          </form>
        </Collapse>
      </Card>

      {/*table list*/}
      <Box sx={{ mt: "50px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl</TableCell>
                <TableCell align="center">Warehouse</TableCell>
                <TableCell align="center">Store</TableCell>
                <TableCell align="center">Store Type</TableCell>
                <TableCell align="center">Status</TableCell>

                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData?.map((data: any, index: any) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data?.warehouseId?.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data?.name}
                  </TableCell>

                  <TableCell component="th" scope="row" align="center">
                    {data?.type}
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ textAlign: "center" }}
                  >
                    {data["isActive"] ? (
                      <Chip label="Active" color="success" />
                    ) : (
                      <Chip label="In-Active" color="error" />
                    )}
                  </TableCell>

                  {/*action cell*/}
                  <TableCell align="center">
                    <IconButton
                      color="secondary"
                      aria-label="Edit"
                      onClick={() => {
                        onEdit(data["_id"]);
                      }}
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        m: "3px",
                        "& :hover": { color: "#31A0F6" },
                      }}
                    >
                      <ModeEditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!listData?.length && (
            <Box
              sx={{
                padding: "27px",
                textAlign: "center",
                color: "#dd2828",
                fontSize: "20px",
              }}
            >
              No Data Found!
            </Box>
          )}

          <Divider />

          {/*pagination*/}
          <Stack
            spacing={2}
            sx={{
              justifyContent: "center",
              flexDirection: "row",
              pb: 8,
              pt: 4,
            }}
          >
            <Pagination
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          </Stack>
        </TableContainer>
      </Box>
    </>
  );
}
