// CURSOR FOLLOW
const cur = document.getElementById("cur");

document.addEventListener("mousemove", (e) => {
  cur.style.transform = `translate(${e.clientX - 9}px, ${e.clientY - 9}px)`;
});