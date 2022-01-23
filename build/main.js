"use strict";
// type text = string;
// type img = string;
// type video = string;
// type todo = string;
/*
*
* Vairables
*
*/
const memoList = Array();
const modal = document === null || document === void 0 ? void 0 : document.querySelector('.modal');
const modalCloseBtn = modal === null || modal === void 0 ? void 0 : modal.querySelector('.close');
const memoContainer = document.querySelector('.memo-container');
const memos = document.querySelectorAll('.memo');
/*
*
* Modal
*
*/
let showModal = (memoType = "text") => {
    const contentName = modal === null || modal === void 0 ? void 0 : modal.querySelector("content-name");
    switch (memoType) {
        case "text": {
            // contentName?.innerHTML = null;
        }
    }
    if (modal != null)
        modal.classList.add('show');
};
let closeModal = () => {
    if (modal != null)
        modal.classList.remove('show');
};
let writeMemo = () => {
    const memoTitle = modal === null || modal === void 0 ? void 0 : modal.querySelector('.memo-title');
    const content = modal === null || modal === void 0 ? void 0 : modal.querySelector('.content');
};
/*
*
* Sortable memo
*
*/
memos.forEach(memo => {
    memo.addEventListener('dragstart', () => {
        memo.classList.add('dragging');
    });
    memo.addEventListener('dragend', () => {
        memo.classList.remove('dragging');
    });
});
memoContainer === null || memoContainer === void 0 ? void 0 : memoContainer.addEventListener('dragover', (event) => {
    const mouseEvent = event;
    const dragging = memoContainer.querySelector('.dragging');
    const { closestMemo, closestOffset } = getClosestMemo(memoContainer, mouseEvent.clientY);
    if (dragging) {
        if (closestOffset === Number.NEGATIVE_INFINITY) {
            memoContainer.appendChild(dragging);
        }
        else {
            memoContainer.insertBefore(dragging, closestMemo);
        }
    }
});
let getClosestMemo = (memoContainer, clientY) => {
    const draggableMemos = [...memoContainer.querySelectorAll('.memo:not(.dragging')];
    let closestOffset = Number.NEGATIVE_INFINITY;
    return {
        closestMemo: draggableMemos.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = clientY - box.top - box.height / 2;
            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                return child;
            }
            else {
                return closest;
            }
        }, draggableMemos[0]), closestOffset: closestOffset
    };
};
//# sourceMappingURL=main.js.map