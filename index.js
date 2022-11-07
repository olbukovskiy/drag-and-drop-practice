const refs = {
  containers: document.querySelectorAll(".container"),
  boxes: document.querySelectorAll(".draggable"),
};

const { containers, boxes } = refs;

boxes.forEach((box) => {
  box.addEventListener("dragstart", () => {
    box.classList.add("dragging");
  });

  box.addEventListener("dragend", () => {
    box.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const addingElement = getDragAfterElement(container, e.clientY);
    const draggingElement = document.querySelector(".dragging");

    if (addingElement == null) {
      container.appendChild(draggingElement);
    } else {
      container.insertBefore(draggingElement, addingElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (acc, currentElement) => {
      const elementCoordinates = currentElement.getBoundingClientRect();
      const offset = y - elementCoordinates.top - elementCoordinates.height / 2;

      if (offset < 0 && offset > acc.offset) {
        return { offset: offset, element: currentElement };
      } else {
        return acc;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
