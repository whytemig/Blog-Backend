# Blog-Backend
DigitalCraft Backend Project

Welcome to our blog application built with Node.js, Express.js, and EJS! This README file will guide you through the setup process and highlight some of the difficulties we faced while implementing images and adding likes functionality.

2. Usage
Our blog application allows users to read and write blog posts. Users can create an account, log in, and start writing their posts. They can also view posts created by other users, like posts, and leave comments.

Key functionalities:

Create a Post: Logged-in users can create new blog posts, add images, and publish them for others to read.
View Posts: Users can view all published blog posts on the home page and read the full content by clicking on a specific post.
User Authentication: User registration and authentication are implemented to manage user access to various functionalities.

3. Difficulties with Image Implementation
While implementing image functionality, we faced some challenges:

File Upload Handling: Managing image file uploads and storage required configuring proper middleware to handle multipart form data and store the images on the server.
Image Display: Rendering images on the front-end using EJS templates involved careful handling of the image paths and ensuring the images were served correctly.
Image Optimization: To improve performance, we had to consider optimizing image sizes and formats for different devices and screen resolutions.

I hope you find this blog application useful and informative. If you encounter any issues or have suggestions for improvements, please feel free to reach out and contribute to the project.

Happy blogging!
