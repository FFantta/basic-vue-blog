<template>
    <div class="login-container">
      <h1>Login</h1>
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px">
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
          <el-button type="primary" @click="handleLogin">Login</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from "vue";
  import { ElMessage } from "element-plus";
  import axios from "axios";
  
  export default {
    name: "LoginPage",
    setup() {
      const form = reactive({
        email: "",
        password: "",
      });
  
      const rules = {
        email: [
          { required: true, message: "Please input your email", trigger: "blur" },
          { type: "email", message: "Please enter a valid email", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please input your password", trigger: "blur" },
          { min: 4, message: "Password must be at least 4 characters", trigger: "blur" },
        ],
      };
  
      const loginForm = ref(null);
  
      const handleLogin = () => {
        loginForm.value.validate((valid) => {
          if (valid) {
            axios
              .post("http://localhost:3000/users/login", form)
              .then((response) => {
                ElMessage.success(response.data.message);
                // Redirect to home or posts page
              })
              .catch((error) => {
                ElMessage.error(
                  error.response?.data?.error || "Login failed. Try again."
                );
              });
          } else {
            ElMessage.error("Please correct the errors in the form.");
          }
        });
      };
  
      const resetForm = () => {
        loginForm.value.resetFields();
      };
  
      return {
        form,
        rules,
        loginForm,
        handleLogin,
        resetForm,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
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
  