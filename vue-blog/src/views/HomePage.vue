<template>
    <div class="home-page">
      <h1>Welcome to the Vue Blog</h1>
      <p>Check out the latest posts below:</p>
  
      <!-- 文章列表表格 -->
      <el-table :data="posts" v-loading="loading" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column label="Title">
          <template #default="scope">
            <!-- 点击文章标题跳转到文章详情 -->
            <router-link :to="`/posts/${scope.row.id}`">{{ scope.row.title }}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="Author"></el-table-column>
        <el-table-column prop="createdAt" label="Created At"></el-table-column>
      </el-table>
  
      <!-- 错误提示 -->
      <div v-if="error" class="error-message">
        <el-alert type="error" title="Failed to load posts!" description="Please try again later." />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    name: "HomePage",
    setup() {
      const posts = ref([]); // 存储文章数据
      const loading = ref(false); // 加载状态
      const error = ref(false); // 错误状态
  
      // 获取文章数据
      const fetchPosts = async () => {
        loading.value = true;
        error.value = false;
        try {
          const response = await axios.get("http://localhost:3000/posts/list"); // 调用后端 API
          posts.value = response.data; // 将数据存储到 posts 中
        } catch (err) {
          console.error("Failed to fetch posts:", err.message);
          error.value = true; // 显示错误提示
        } finally {
          loading.value = false; // 停止加载状态
        }
      };
  
      onMounted(() => {
        fetchPosts(); // 页面加载时获取文章数据
      });
  
      return {
        posts,
        loading,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  .home-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .error-message {
    margin-top: 20px;
  }
  </style>
  