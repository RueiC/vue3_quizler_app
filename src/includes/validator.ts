import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email("email格式錯誤").required("此選項必填"),
  password: yup.string().min(5, "最少需要5個字元").required("此選項必填"),
});
