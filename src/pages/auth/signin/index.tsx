"use client";
import BlankLayout from "@/Layout/BlankLayout";
import Copyright from "@/Layout/Copyright";
import { handleTextChange } from "@/utils/form";
import { Alert } from "@mui/material";
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

const SignIn = () => {
  const [errorMessage, setErrorMessage] = React.useState<any>({});
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `${process.env["API_BASE_URL"]}/auth/login`;
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) => handleTextChange(e, setFormData, formData)}
          />
          {errorMessage?.["message"] && (
            <Alert sx={{ mb: 2, mt: 2 }} severity="error">
              {errorMessage?.["message"]}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container sx={{ justifyContent: "end" }}>
            <Grid item>
              <Link href="/auth/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
SignIn.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default SignIn;
