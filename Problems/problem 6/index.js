// Please don't change the pre-written code
// Import the necessary modules here

import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import { addBlog, renderBlogForm, renderBlogs } from "./src/controllers/blog.controller.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(expressEjsLayouts);
app.use(express.urlencoded({extended: true}));

// Write your code here
app.get("/createblog", renderBlogForm)
app.get("/", renderBlogs)
app.post("/addblog", addBlog);

export default app;
