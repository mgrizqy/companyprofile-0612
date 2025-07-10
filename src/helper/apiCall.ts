import axios from "axios";

export const APP_ID = process.env.NEXT_PUBLIC_APP_ID

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY


export const apiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});