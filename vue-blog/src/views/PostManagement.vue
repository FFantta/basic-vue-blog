<template>
    <div class="post-management-container">
      <h1>Post Management</h1>
  
      <!-- 显示文章列表 -->
      <el-table :data="posts" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="title" label="Title"></el-table-column>
        <el-table-column prop="author" label="Author"></el-table-column>
        <el-table-column prop="createdAt" label="Created At"></el-table-column>
        <el-table-column label="Actions" width="150">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="editPost(scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="deletePost(scope.row.id)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 添加文章 -->
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="add-post-button"
        @click="showAddDialog = true"
        >Add Post</el-button>
  
      <!-- 添加文章对话框 -->
      <el-dialog title="Add New Post" v-model="showAddDialog">
        <el-form :model="newPost" ref="postForm">
          <el-form-item label="Title" prop="title">
            <el-input v-model="newPost.title" placeholder="Enter post title"></el-input>
          </el-form-item>
          <el-form-item label="Content" prop="content">
            <el-input
              type="textarea"
              v-model="newPost.content"
              placeholder="Enter post content"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showAddDialog = false">Cancel</el-button>
          <el-button type="primary" @click="addPost">Save</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref, reactive, onMounted } from "vue";
  import { ElMessage } from "element-plus";
  
  export default {
    name: "PostManagement",
    setup() {
      const posts = ref([]);
      const loading = ref(false);
  
      const showAddDialog = ref(false);
      const newPost = reactive({
        title: "",
        content: "",
        author: "testuser", // 默认的作者名，可根据登录用户动态设置
      });
  
      const fetchPosts = async () => {
        loading.value = true;
        try {
          const response = await axios.get("http://localhost:3000/posts/list");
          posts.value = response.data;
        } catch (error) {
          ElMessage.error("Failed to fetch posts: " + error.message);
        } finally {
          loading.value = false;
        }
      };
  
      const addPost = async () => {
        try {
            axios.post("http://localhost:3000/posts/create", newPost)
                .then((response) => {
                ElMessage.success("Post added successfully!");
                showAddDialog.value = false;
                fetchPosts(); // 重新加载文章列表
            })
            .catch((error) => {
                ElMessage.error("Failed to add post: " + error.response?.data?.error || error.message);
            });
        } catch (error) {
          ElMessage.error("Failed to add post: " + error.message);
        }
      };
  
      const editPost = (post) => {
        ElMessage.info(`Editing post with ID: ${post.id}`);
        // 添加编辑功能可以打开另一个对话框
      };
  
      const deletePost = async (id) => {
        try {
          await axios.delete(`http://localhost:3000/posts/delete/${id}`);
          ElMessage.success("Post deleted successfully!");
          fetchPosts(); // 重新加载文章列表
        } catch (error) {
          ElMessage.error("Failed to delete post: " + error.message);
        }
      };
  
      onMounted(() => {
        fetchPosts();
      });
  
      return {
        posts,
        loading,
        showAddDialog,
        newPost,
        fetchPosts,
        addPost,
        editPost,
        deletePost,
      };
    },
  };
  </script>
  
  <style scoped>
  .post-management-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .add-post-button {
    margin-top: 20px;
  }
  </style>
  