import API_KEY from "./env.js";

function createNav() {
  const nav = document.createElement("nav");
  nav.classList.add("nav");
  const links = document.createElement("div");
  links.classList.add("links");
  const homeLink = document.createElement("a");
  homeLink.textContent = "Home";
  listenerToReaset(homeLink);
  const createPostLink = document.createElement("a");
  createPostLink.textContent = "Create Post";
  createPostLink.addEventListener("click", () => createNewPost());
  createPostLink.classList.add("links");
  const logo = createLogo();
  listenerToReaset(logo);
  nav.appendChild(logo);
  nav.appendChild(links);
  links.appendChild(homeLink);
  links.appendChild(createPostLink);
  return nav;
}

function reaset() {
  const root = document.getElementById("root");
  root.innerHTML = "";
  start();
}

function listenerToReaset(elemnt) {
  elemnt.addEventListener("click", () => reaset());
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

async function createPosts() {
  const posts = document.createElement("div");
  posts.classList.add("posts");
  posts.id = "posts";
  const data = await getAllData();
  data.forEach((p) => {
    const post = document.createElement("div");
    post.classList.add("post");
    const img = document.createElement("img");
    img.classList.add("img-post");
    img.setAttribute("src", p.urlToImage);
    post.appendChild(img);
    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = p.author;
    post.appendChild(author);
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = p.title;
    post.appendChild(title);
    posts.appendChild(post);
    post.addEventListener(
      "click",
      async (e) => {
        posts.innerHTML = "";
        post.className = "one-post";
        post.removeChild(author);
        post.removeChild(title);
        const description = document.createElement("h2");
        description.textContent = p.description;
        description.classList.add("description");
        post.append(description);
        const content = document.createElement("p");
        content.textContent = p.content;
        content.classList.add("content");
        post.appendChild(content);
        posts.appendChild(post);
      },
      { once: true }
    );
  });
  addElementToHtml(posts);
}
function createNewPost() {
  const posts = document.getElementById("posts");
  posts.remove();

  const form = document.createElement("form");
  form.classList.add("new-post");

  const labelToAuthor = document.createElement("label");
  labelToAuthor.setAttribute("for", "author");
  labelToAuthor.textContent = "Enter author name:";
  const inputAuthor = document.createElement("input");
  inputAuthor.id = "author";
  inputAuthor.required = true;
  const inputLabelAuthor = document.createElement("div");
  inputLabelAuthor.appendChild(labelToAuthor);
  inputLabelAuthor.appendChild(inputAuthor);
  form.appendChild(inputLabelAuthor);

  const labelToTitle = document.createElement("label");
  labelToTitle.setAttribute("for", "title");
  labelToTitle.textContent = "Enter some title:";
  const inputTitle = document.createElement("input");
  inputTitle.id = "title";
  inputTitle.required = true;
  const inputLabelTitle = document.createElement("div");
  inputLabelTitle.appendChild(labelToTitle);
  inputLabelTitle.appendChild(inputTitle);
  form.appendChild(inputLabelTitle);

  const labelToDescription = document.createElement("label");
  labelToDescription.setAttribute("for", "description");
  labelToDescription.textContent = "Enter some description:";
  const inputDescription = document.createElement("textarea");
  inputDescription.setAttribute("rows", 9);
  inputDescription.id = "description";
  inputDescription.required = true;
  const inputLabelDescription = document.createElement("div");
  inputLabelDescription.appendChild(labelToDescription);
  inputLabelDescription.appendChild(inputDescription);
  form.appendChild(inputLabelDescription);

  const labelToContent = document.createElement("label");
  labelToContent.setAttribute("for", "content");
  labelToContent.textContent = "Enter some content:";
  const inputContent = document.createElement("textarea");
  inputContent.setAttribute("rows", 9);
  inputContent.id = "content";
  inputContent.required = true;
  const inputLabelContent = document.createElement("div");
  inputLabelContent.appendChild(labelToContent);
  inputLabelContent.appendChild(inputContent);
  form.appendChild(inputLabelContent);

  const labelToImg = document.createElement("label");
  // labelToImg.setAttribute("for", "input-img");
  labelToImg.textContent = "Choose a theme image:";
  const inputImg = document.createElement("input");
  inputImg.type = "file";
  inputImg.id = "input-img";
  inputImg.required = true;
  const inputLabelImg = document.createElement("div");
  inputLabelImg.classList.add("inputLabelImg");
  inputLabelImg.appendChild(labelToImg);
  inputLabelImg.appendChild(inputImg);
  form.appendChild(inputLabelImg);

  const btn = document.createElement("button");
  btn.textContent = "Add Post";
  form.appendChild(btn);

  btn.addEventListener("click", async (event) => {
    event.preventDefault();

    const newPost = {
      author: inputAuthor.value,
      title: inputTitle.value,
      description: inputDescription.value,
      content: inputContent.value,
      urlToImage: getPathForUrl(inputImg),
    };
    console.log(newPost);
    addDataToLocalStorage(newPost);
    const p = document.createElement("p");
    p.textContent = "The post was added successfully!";
    form.appendChild(p);
  });

  addElementToHtml(form);
}

function getPathForUrl(element) {
  return URL.createObjectURL(element.files[0]);
}

async function addDataToLocalStorage(data) {
  let allData = localStorage.getItem("data");
  console.log(allData);
  if (allData) {
    allData = JSON.parse(allData);
  }
  allData.push(data);
  localStorage.setItem("data", JSON.stringify(allData));
}

async function getAllData() {
  let data = localStorage.getItem("data");
  if (data) {
    console.log("if");
    data = JSON.parse(data);
  } else {
    console.log("else");
    // const respons = await fetch(
    //   `https://newsapi.org/v2/everything?q=apple&from=2025-08-23&to=2025-08-23&sortBy=popularity&apiKey=${API_KEY}`
    // );
    const respons = await fetch(
      `https://newsapi.org/v2/everything?q=tesla&from=2025-07-25&sortBy=publishedAt&apiKey=${API_KEY}`
    );
    data = await respons.json();
    data = data.articles;
    localStorage.setItem("data", JSON.stringify(data));
  }
  return data;
}

function start() {
  addElementToHtml(createNav());
  createPosts();
}

start();
