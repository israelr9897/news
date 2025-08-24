// import { config } from "dotenv";
// config()
import API_KEY from "./env.js";

function createNav() {
  const nav = document.createElement("nav");
  nav.classList.add("nav");
  const links = document.createElement("div");
  links.classList.add("links");
  const homeLink = document.createElement("a");
  homeLink.textContent = "Home";
  const createPostLink = document.createElement("a");
  createPostLink.textContent = "Create Post";
  createPostLink.classList.add("links");
  const logo = createLogo();
  nav.appendChild(logo);
  nav.appendChild(links);
  links.appendChild(homeLink);
  links.appendChild(createPostLink);
  return nav;
}

function clear() {
  const root = document.getElementById("root");
  root.remove()
}

function addElementToHtml(element) {
  const root = document.getElementById("root");
  root.appendChild(element);
}

function createLogo() {
  const logo = document.createElement("img");
  logo.src = "./logo.png";
  logo.classList.add("logo");
  logo.addEventListener("click", () => {});
  return logo;
}

async function createPost() {
  const posts = document.createElement("div");
  posts.classList.add("posts");
  const data = await getAllData();
  data.forEach((p) => {
    const post = document.createElement("div");
    post.classList.add("post");
    const img = document.createElement("img");
    img.classList.add("img-post");
    img.setAttribute("src", p.urlToImage)
    post.appendChild(img);
    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = p.author;
    post.appendChild(author);
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = p.title;
    post.appendChild(title);
    posts.appendChild(post)
    post.addEventListener("click", async (e) => {
        posts.innerHTML =""
        post.className = "full-post"
        const description = document.createElement("h2")
        description.textContent = p.description
        post.append(description)
        const content = document.createElement("p")
        content.textContent = p.content
        post.appendChild(content)
        posts.appendChild(post)
    })
  });
  addElementToHtml(posts);
}

// function createPosts() {
//   const posts = document.createElement("div");
//   posts.classList.add("posts");
//   for (let i = 0; i < 7; i++) {
//     posts.appendChild(createPost());
//   }
//   addElementToHtml(posts);
// }

async function getAllData() {
  let data = localStorage.getItem("data");
  if (data) {
    console.log("if");
    data = JSON.parse(data);
  } else {
    console.log("else");
    const respons = await fetch(
      `https://newsapi.org/v2/everything?q=apple&from=2025-08-23&to=2025-08-23&sortBy=popularity&apiKey=${API_KEY}`
    );
    data = await respons.json();
    data = data.articles;
    localStorage.setItem("data", JSON.stringify(data));
  }
  return data;
}

addElementToHtml(createNav());
createPost();
