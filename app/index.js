import "./index.scss";

// create dom element
const dom = document.createElement("div");

// append .react-notification to dom
(function () {
  dom.classList.add("react-notification");
  window.onload = () => document.querySelector("body").appendChild(dom);
})();

// define class
class Notification {}

Notification.prototype.show = function (
  content,
  duration = 3000,
  theme = "light",
  method = "info",
  onClose = Function.prototype
) {
  // create contentbox
  const contentBox = document.createElement("div");
  const contentDom = document.createElement("span");

  // create icon
  const icon = document.createElement("i");
  icon.classList.add("react-notification-icon");

  // set text
  contentDom.innerText = content;

  // add contentbox classes
  contentBox.classList.add("react-content-box");
  contentBox.classList.add(theme);
  contentBox.classList.add(method);
  contentBox.classList.add("animate-in");

  // append icon
  contentBox.appendChild(icon);

  // append content
  contentBox.appendChild(contentDom);

  // set style for contentbox
  contentBox.style.top = `${this.count * 50}px`;

  // append contentbox
  dom.appendChild(contentBox);

  this.count++;

  // remove Notification box after duration
  setTimeout(() => {
    contentBox.classList.add("animate-out");
    setTimeout(() => {
      dom.removeChild(contentBox);

      const boxs = document.querySelectorAll(".react-content-box");
      for (let i = 0; i < boxs.length; i++) {
        boxs[i].style.top = `${parseInt(boxs[i].style.top, 10) - 50}px`;
      }
      this.count--;

      if (typeof onClose === "function") onClose();
    }, 300);
  }, duration);
};

// API
["success", "error", "warn", "info"].forEach((method) => {
  Notification.prototype[method] = function (content, duration, theme, onClose) {
    this.show(content, duration, theme, method, onClose);
  };
});

// the count of Notifications already exist
Notification.prototype.count = 0;

export const message = new Notification();
