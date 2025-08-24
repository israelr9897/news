
const continer = document.getElementById("continer")
continer.classList.add("continer")
const big = document.getElementById("big")

const left = document.getElementById("left")
const right = document.getElementById("right")

right.addEventListener("click", () => {
    continer.style.background = "#cfe2f4"
    const p = document.getElementById("p")
    p.textContent = "This is 02"
})
left.addEventListener("click", () => {
    continer.style.background = "#d9ead3"
    const p = document.getElementById("p")
    p.textContent = "This is 01"
})