// Đặt cấu hình mặc định lúc tạo ra instance
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
});

// Sửa đổi cấu hình trị mặc định sau khi tạo ra instance
instance.defaults.headers.common["Authorization"] =
  localStorage.getItem("token") || "";
