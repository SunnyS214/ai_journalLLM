import axios from "axios"

const API= axios.create({
    baseURL:"https://ai-journalllm.onrender.com/api",
    withCredentials:true
})

export default API;