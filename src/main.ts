import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import setupTokenInterceptor from "@/middlewares/token.interceptor";
import setupErrorInterceptor from "@/middlewares/error.interceptor";

import { BootstrapVue3 } from "bootstrap-vue-3"

import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css"
import "mosha-vue-toastify/dist/style.css";

import Vue3Lottie from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';

setupTokenInterceptor();
setupErrorInterceptor();

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(BootstrapVue3);
app.use(Vue3Lottie);
app.mount('#app');
