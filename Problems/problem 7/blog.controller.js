// Please don't change the pre-written code

let errors = [];
export const validateBlog = (req, res) => {
  // Write your code here
  const {title, description, image} = req.body;
  if(!title || title.trim() == ''){
    errors.push("The title field should not be empty.")
  }
  if(title.length < 3){
    errors.push("The title field should contain at least 3 characters.")
  }
  if(!description || description.trim() == ''){
    errors.push("The description field should not be empty.")
  }
  if (description.length < 10){
    errors.push("The description field should contain at least 10 characters.")
  }
  try {
    const validUrl = new URL(image);
  } catch (err) {
    errors.push("The image URL provided should be a valid URL.");
  }

  if(errors.length > 0){
    return res.render("addBlog", {errors: errors, success: false});    
  }else{
    res.status(201).render("addBlog", { errors: errors, success: true });
  }
};
export const renderBlogForm = (req, res) => {
  res.render("addBlog", { errors: errors, success: false });
};
