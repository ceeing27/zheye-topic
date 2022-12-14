import { createApp } from "vue";
import axios from "axios";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "easymde/dist/easymde.min.css";

axios.defaults.baseURL = "http://apis.imooc.com/api/";

axios.interceptors.request.use((config) => {
  // get请求，添加到url中
  config.params = { ...config.params, icode: "DDDCFCD949B112E7" };
  // 其他请求，添加到body中
  // 如果是上传文件，添加到formdata中
  if (config.data instanceof FormData) {
    config.data.append("icode", "DDDCFCD949B112E7");
  } else {
    // 普通的body对象，添加到data中
    config.data = { ...config.data, icode: "DDDCFCD949B112E7" };
    store.commit("setLoading", true);
    store.commit("setError", { status: false, message: "" });
  }
  return config;
});

axios.interceptors.response.use(
  (config) => {
    store.commit("setLoading", false);
    return config;
  },
  (e) => {
    const { error } = e.response.data;
    store.commit("setError", { status: true, message: error });
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
