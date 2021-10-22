const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll("#deleteBtn");

const handleDelete = async (event) => {
  const target = event.target.parentNode;
  const { id } = target.dataset;
  target.remove();

  const response = await fetch(`/api/videos/${id}/deleteComment`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const spanText = document.createElement("span");
  spanText.innerText = ` ${text}`;
  const spanX = document.createElement("span");
  spanX.innerText = "  ❌";
  newComment.appendChild(icon);
  newComment.appendChild(spanText);
  newComment.appendChild(spanX);
  videoComments.prepend(newComment);
  spanX.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === " ") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/createComment`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    const { newCommentId } = await response.json();
    textarea.value = "";
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteBtn) {
  deleteBtn.forEach((element) => {
    element.addEventListener("click", handleDelete);
  });
}
