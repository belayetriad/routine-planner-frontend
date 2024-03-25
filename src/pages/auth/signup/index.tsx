"use client";
import BlankLayout from "@/Layout/BlankLayout";
import Copyright from "@/Layout/Copyright";
import { handleTextChange } from "@/utils/form";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import * as React from "react";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = React.useState<any>({});
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${process.env["API_BASE_URL"]}/auth/register`;
    await axios
      .post(url, formData)
      .then((res) => {
        const { token } = res.data;

        // Set the token in a cookie
        Cookies.set("accessToken", token);

        // Redirect to the desired page (e.g., /dashboard)
        window.location.href = "/";
      })
      .catch((error) => {
        setErrorMessage({ message: error?.response?.data?.message });
      });
  };

  React.useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }} src="/ph_logo.svg"></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                value={formData.email}
                onChange={(e) => handleTextChange(e, setFormData, formData)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={(e) => handleTextChange(e, setFormData, formData)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => handleTextChange(e, setFormData, formData)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
SignUp.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default SignUp;
