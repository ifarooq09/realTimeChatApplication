import axios from "axios";
import { HOST } from "@/utils/constants";

export const apiService = axios.create({
  baseURL: HOST,
})

