<template>
    <div class="post-detail">
      <!-- 显示文章详情 -->
      <el-card v-if="post" class="box-card">
        <h2>{{ post.title }}</h2>
        <p><strong>Author:</strong> {{ post.author }}</p>
        <p><strong>Created At:</strong> {{ new Date(post.createdAt).toLocaleString() }}</p>
        <el-divider></el-divider>
        <p>{{ post.content }}</p>
      </el-card>
  
      <!-- 加载状态 -->
      <div v-else-if="loading" class="loading">
        <el-spinner></el-spinner>
      </div>
  
      <!-- 错误提示 -->
      <div v-else class="error-message">
        <el-alert type="error" title="Failed to load post!" description="Please try again later." />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  
  export default {
    name: "PostDetail",
    setup() {
      const route = useRoute(); // 获取路由信息
      const post = ref(null); // 存储文章详情
      const loading = ref(false); // 加载状态
      const error = ref(false); // 错误状态
  
      // 获取单个文章详情
      const fetchPost = async () => {
        const postId = route.params.id; // 获取文章 ID
        loading.value = true;
        error.value = false;
        try {
          const response = await axios.get(`http://localhost:3000/posts/${postId}`); // 调用后端 API
          post.value = response.data; // 将文章详情存储到 post 中
        } catch (err) {
          console.error("Failed to fetch post:", err.message);
          error.value = true; // 显示错误提示
        } finally {
          loading.value = false; // 停止加载状态
        }
      };
  
      onMounted(() => {
        fetchPost(); // 页面加载时获取文章详情
      });
  
      return {
        post,
        loading,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  .post-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .loading {
    text-align: center;
  }
  
  .error-message {
    margin-top: 20px;
  }
  </style>
  