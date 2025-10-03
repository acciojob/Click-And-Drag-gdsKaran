const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let dragged = null;
let offsetX = 0;
let offsetY = 0;

// Place items in grid on load
items.forEach((item, index) => {
  const row = Math.floor(index / 5);
  const col = index % 5;
  item.style.left = `${col * 200}px`; // matches .item width
  item.style.top = `${row * 200}px`;  // matches .item height

  item.addEventListener('mousedown', (e) => {
    dragged = item;
    const rect = item.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    item.style.zIndex = 1000; // bring dragged item on top
  });
});

document.addEventListener('mousemove', (e) => {
  if (dragged) {
    const containerRect = container.getBoundingClientRect();
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    // Boundaries
    x = Math.max(0, Math.min(container.clientWidth - dragged.offsetWidth, x));
    y = Math.max(0, Math.min(container.clientHeight - dragged.offsetHeight, y));

    dragged.style.left = x + 'px';
    dragged.style.top = y + 'px';
  }
});

document.addEventListener('mouseup', () => {
  if (dragged) {
    dragged.style.zIndex = ''; // reset z-index
  }
  dragged = null;
});
