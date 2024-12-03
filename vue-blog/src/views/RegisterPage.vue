<template>
    <div class="register-container">
      <h1>Register</h1>
      <el-form :model="form" :rules="rules" ref="registerForm" label-width="100px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Enter your username"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">Register</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router"; // 用于跳转路由
  import { ElMessage } from "element-plus";
  import axios from "axios";
  
  export default {
    name: "RegisterPage",
    setup() {
      const router = useRouter(); // 初始化路由
      const form = reactive({
        username: "",
        email: "",
        password: "",
      });
  
      const rules = {
        username: [
          { required: true, message: "Please input your username", trigger: "blur" },
          { min: 3, message: "Username must be at least 3 characters", trigger: "blur" },
        ],
        email: [
          { required: true, message: "Please input your email", trigger: "blur" },
          { type: "email", message: "Please enter a valid email", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please input your password", trigger: "blur" },
          { min: 4, message: "Password must be at least 4 characters", trigger: "blur" },
        ],
      };
  
      const registerForm = ref(null);
  
      const handleRegister = () => {
        registerForm.value.validate((valid) => {
          if (valid) {
            axios
              .post("http://localhost:3000/users/register", form)
              .then((response) => {
                // 成功提示
                ElMessage.success("Registration successful!");
                // 跳转到登录页面
                setTimeout(() => {
                  router.push("/login"); // 跳转到 /login
                }, 1500); // 1.5秒后跳转
              })
              .catch((error) => {
                // 错误提示
                ElMessage.error(
                  error.response?.data?.error || "Registration failed. Try again."
                );
              });
          } else {
            ElMessage.error("Please correct the errors in the form.");
          }
        });
      };
  
      const resetForm = () => {
        registerForm.value.resetFields();
      };
  
      return {
        form,
        rules,
        registerForm,
        handleRegister,
        resetForm,
      };
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .el-button {
    margin-right: 10px;
  }
  </style>
  