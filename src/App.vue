<template>
  <div class="container-fluid min-vh-100 px-0 flex-shrink-0 bg-light">
    <top-header :user="currentUser"></top-header>
    <message
      type="error"
      :message="error.message"
      v-if="error.status"
    ></message>
    <loader v-if="isLoading"></loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-4">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2022 者也专栏</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";
import TopHeader from "./components/TopHeader.vue";
import Loader from "./components/Loader.vue";
import createMessage from "./components/createMessage";
import { GlobalDataProps } from "./store";

export default defineComponent({
  name: "App",
  components: {
    TopHeader,
    Loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      }
    );

    return {
      currentUser,
      isLoading,
      error,
    };
  },
});
</script>

<style></style>
