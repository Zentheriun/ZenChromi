// domUtils.js
export const getById = (id) => document.getElementById(id);
export const get = (selector) => document.querySelector(selector);
export const getAll = (selector) => document.querySelectorAll(selector);
export const create = (tagName) => document.createElement(tagName);
export const appendChild = (parent, child) => parent.appendChild(child);
export const removeChild = (parent, child) => parent.removeChild(child);
export const addClass = (element, className) => element.classList.add(className);
export const removeClass = (element, className) => element.classList.remove(className);
export const toggleClass = (element, className) => element.classList.toggle(className);
export const hasClass = (element, className) => element.classList.contains(className);