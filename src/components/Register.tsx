import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import axios from "../service/axios";
import InputStyled from "./InputStyled";
import ButtonStyled from "./ButtonStyled";
import { MyContext } from "../context/ContextProvider";
import UserModel from "../model/UserModel";

function Register({ toggleIsRegister }: { toggleIsRegister: () => void }) {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    id: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [validateForm, setValidateForm] = useState({
    id: { isError: false, message: "" },
    name: { isError: false, message: "" },
    password: { isError: false, message: "" },
    confirmPassword: { isError: false, message: "" },
  });

  const validate = () => {
    const validated = {
      id: { isError: false, message: "" },
      name: { isError: false, message: "" },
      password: { isError: false, message: "" },
      confirmPassword: { isError: false, message: "" },
    };
    if (!registerForm.id.trim()) {
      validated.id.isError = true;
      validated.id.message = "กรอก ID";
    }
    if (!registerForm.name.trim()) {
      validated.name.isError = true;
      validated.name.message = "กรอก ชื่อ";
    }
    if (!registerForm.password.trim()) {
      validated.password.isError = true;
      validated.password.message = "กรอก Password";
    }
    if (!registerForm.confirmPassword.trim()) {
      validated.confirmPassword.isError = true;
      validated.confirmPassword.message = "กรอก confirmPassword";
    }
    if (registerForm.password != registerForm.confirmPassword) {
      validated.password.isError = true;
      validated.password.message = "Password ไม่ตรงกัน";
      validated.confirmPassword.isError = true;
      validated.confirmPassword.message = "Password ไม่ตรงกัน";
    }
    setValidateForm(validated);
    if (
      validated.confirmPassword.isError ||
      validated.id.isError ||
      validated.name.isError ||
      validated.password.isError
    ) {
      return true;
    }
    return false;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.id]: e.target!.value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const isError = validate();
      if (isError) {
        return;
      }
      const user = await axios.post<UserModel>("api/register", registerForm);
      context?.setUser(user.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data == "This id is already used") {
          setValidateForm((prev) => ({
            ...prev,
            id: { isError: true, message: err.response?.data },
          }));
        }
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          สมัคร
        </h2>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="mt-5 sm:mx-auto w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mt-2">
            <InputStyled
              className="block w-full"
              error={validateForm.id.isError}
              id="id"
              label="ID"
              value={registerForm.id}
              onChange={handleChange}
              helperText={validateForm.id.message}
            />
          </div>

          <div className="mt-2">
            <InputStyled
              className="block w-full"
              error={validateForm.name.isError}
              id="name"
              label="ชื่อ"
              value={registerForm.name}
              onChange={handleChange}
              helperText={validateForm.name.message}
            />
          </div>

          <div className="mt-2">
            <InputStyled
              className="block w-full"
              error={validateForm.password.isError}
              id="password"
              label="password"
              type="password"
              value={registerForm.password}
              onChange={handleChange}
              helperText={validateForm.password.message}
            />
          </div>

          <div className="mt-2">
            <InputStyled
              className="block w-full"
              error={validateForm.confirmPassword.isError}
              id="confirmPassword"
              label="Confirm password"
              type="password"
              value={registerForm.confirmPassword}
              onChange={handleChange}
              helperText={validateForm.confirmPassword.message}
            />
          </div>

          <div>
            <ButtonStyled type="submit" className="w-full" variant="contained">
              Sign up
            </ButtonStyled>
          </div>

          <div>
            <ButtonStyled
              onClick={toggleIsRegister}
              className="w-full"
              variant="outlined"
            >
              มีรหัสแล้ว
            </ButtonStyled>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
