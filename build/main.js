"use strict";
/*
*
* Modal
*
*/
const modal = document.querySelector('.modal');
const modalCloseBtn = modal === null || modal === void 0 ? void 0 : modal.querySelector('.close');
let showModal = (memoType) => {
    const contentName = modal === null || modal === void 0 ? void 0 : modal.querySelector("content-name");
    switch (typeof memoType) {
        case text:
    }
    if (modal != null)
        modal.classList.add('show');
};
let closeModal = () => {
    if (modal != null)
        modal.classList.remove('show');
};
//# sourceMappingURL=main.js.map