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
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function StudyPlanComponent() {
  const defaultData = {
    classes: [],
    availableTime: 0,
    date: dayjs(new Date()),
  };

  const validationSchema = Yup.object({
    classes: Yup.array().min(1, "This field is required"),
    availableTime: Yup.number().required("Available Time is required"),
    date: Yup.string().required("Date is required"),
  });

  // states
  const [editDataId, setEditDataId] = useState<null | string>(null);
  const [listData, setListData] = useState<any>([]);
  const [classListData, setClassListData] = useState<any>([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [studyPlanDate, setStudyPlanDate] = useState(dayjs(new Date()));

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleMultipleSelectChange = (e: SelectChangeEvent<any>) => {
    formik.setFieldValue("classes", e.target.value);
  };

  const handleDateChange = (date: any) => {
    formik.setFieldValue("date", date);
  };

  const formik = useFormik({
    initialValues: defaultData,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        if (editDataId) {
          await apiRequest.put(`/study-plans/${editDataId}`, values);
        } else {
          await apiRequest.post("/study-plans", values);
        }

        Swal.fire({
          title: "Action Successful!",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        onClear();
        getList();
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

  const getList = async (date = studyPlanDate) => {
    await apiRequest
      .get(`/study-plans?date=${date}`)
      .then((res) => {
        setListData(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getClassList = async () => {
    await apiRequest
      .get(`/class-session`)
      .then((res) => {
        setClassListData(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getList();
    getClassList();
  }, []);

  const handleStudyPlanDateChange = (date: string) => {
    setStudyPlanDate(date);
    getList(date);
  };

  const onEdit = (id: string) => {
    setEditDataId(id);
    const editData = listData.find((data: any) => data["_id"] === id);
    if (editData) {
      formik.setValues({
        name: editData?.name,
        availableTime: editData.availableTime,
        date: editData.date,
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
          <CardHeader
            title="Study Plan"
            titleTypographyProps={{ variant: "h6" }}
          />
        </div>

        <Divider style={{ margin: 0 }} />

        <Collapse in={isFormVisible}>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Grid container spacing={5} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Classes
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      type="text"
                      label="Classes"
                      name="classes"
                      placeholder="Classes"
                      value={formik.values.classes}
                      onChange={handleMultipleSelectChange}
                      error={
                        formik.touched.classes && Boolean(formik.errors.classes)
                      }
                      multiple
                    >
                      {classListData?.map((classData: any, index: number) => {
                        return (
                          <MenuItem key={index} value={classData?._id}>
                            {classData?.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {formik.errors.date &&
                        formik.touched.date &&
                        String(formik.errors.date)}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={5} sx={{ mb: 6 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Available Time (In hour)"
                    name="availableTime"
                    placeholder="Available Time (In hour)"
                    value={formik.values.availableTime}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.availableTime &&
                      Boolean(formik.errors.availableTime)
                    }
                    helperText={
                      <>
                        {formik.errors.availableTime &&
                          formik.touched.availableTime &&
                          String(formik.errors.availableTime)}
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    label="Date"
                    name="date"
                    value={formik.values.date}
                    minDate={dayjs(new Date())}
                    onChange={(date) => handleDateChange(date)}
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
        <Box sx={{ background: "#fff", p: 2 }}>
          <Grid container sx={{ justifyContent: "end" }}>
            <Grid item xs={12} sm={3}>
              <DatePicker
                sx={{ width: "100%" }}
                format="DD-MM-YYYY"
                label="Date"
                name="date"
                value={dayjs(studyPlanDate)}
                onChange={(date) => handleStudyPlanDateChange(date)}
              />
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Class Name</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Priority</TableCell>
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
                    {dayjs(data?.date).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data?.classSession?.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data?.duration}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data?.classSession?.priority}
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
        </TableContainer>
      </Box>
    </>
  );
}
