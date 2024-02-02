import { ChangeEvent, FormEvent, useContext, useState } from "react";
import ButtonStyled from "./ButtonStyled";
import InputStyled from "./InputStyled";
import { AxiosError } from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { MyContext } from "../context/ContextProvider";
import axios from "../service/axios";
import UserModel from "../model/UserModel";

function Login({ toggleIsRegister }: { toggleIsRegister: () => void }) {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });
  const [validateForm, setValidateForm] = useState({
    id: { isError: false, message: "" },
    password: { isError: false, message: "" },
  });
  const validate = (): boolean => {
    const validated = {
      id: { isError: false, message: "" },
      password: { isError: false, message: "" },
    };
    if (!loginForm.id.trim()) {
      validated.id.isError = true;
      validated.id.message = "กรอก ID";
    }
    if (!loginForm.password.trim()) {
      validated.password.isError = true;
      validated.password.message = "กรอก Password";
    }
    if (validated.id.isError || validated.password.isError) {
      setValidateForm(validated);
      return true;
    }
    return false;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const isError = validate();
      if (isError) {
        return;
      }
      const user = await axios.post<UserModel>("/api/login", loginForm);
      context?.setUser(user.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data == "Login failed") {
          setValidateForm({
            id: { isError: true, message: err.response?.data },
            password: { isError: true, message: err.response?.data },
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          ล็อกอิน
        </h2>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <InputStyled
              className="block w-full"
              error={validateForm.id.isError}
              id="id"
              label="ID"
              type="text"
              value={loginForm.id}
              onChange={handleChange}
              helperText={validateForm.id.message}
            />
          </div>

          <div>
            <InputStyled
              className="block w-full"
              error={validateForm.password.isError}
              id="password"
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={handleChange}
              helperText={validateForm.password.message}
            />
          </div>

          <div>
            <ButtonStyled className="w-full" variant="contained" type="submit">
              Sign in
            </ButtonStyled>
          </div>

          <div>
            <ButtonStyled
              onClick={toggleIsRegister}
              className="w-full"
              variant="outlined"
            >
              ยังไม่มีรหัส
            </ButtonStyled>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
