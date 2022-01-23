// type text = string;
// type img = string;
// type video = string;
// type todo = string;

// type memoType = text | img | video | todo;

type memo = {
    title: string;
    content: string;
    imgURL?: string;
    videoURL?: string;
}

/*
*
* Vairables
*
*/

const memoList = Array<memo>();

const modal = document?.querySelector('.modal');
const modalCloseBtn = modal?.querySelector('.close');
const memoContainer = document.querySelector('.memo-container');
const memos = document.querySelectorAll('.memo');
/*
*
* Modal
*
*/

let showModal = (memoType: string = "text") => {
    const contentName = modal?.querySelector("content-name");

    switch (memoType) {
        case "text": {
            // contentName?.innerHTML = null;
        }
    }

    if (modal != null) modal.classList.add('show');


}

let closeModal = () => {
    if (modal != null) modal.classList.remove('show');
}

let writeMemo = () => {
    const memoTitle = modal?.querySelector('.memo-title');
    const content = modal?.querySelector('.content');
}

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

memoContainer?.addEventListener('dragover', (event) => {
    const mouseEvent = event as MouseEvent;
    const dragging = memoContainer.querySelector('.dragging');
    const { closestMemo, closestOffset } = getClosestMemo(memoContainer, mouseEvent.clientY);

    if (dragging) {
        if (closestOffset === Number.NEGATIVE_INFINITY) {
            memoContainer.appendChild(dragging);
        } else {
            memoContainer.insertBefore(dragging, closestMemo);
        }
    }
});

let getClosestMemo = (memoContainer: Element, clientY: number): { closestMemo: Element, closestOffset: number } => {
    const draggableMemos = [...memoContainer.querySelectorAll('.memo:not(.dragging')];

    let closestOffset = Number.NEGATIVE_INFINITY;

    return {
        closestMemo: draggableMemos.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = clientY - box.top - box.height / 2;

            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                return child;
            } else {
                return closest;
            }

        }, draggableMemos[0]), closestOffset: closestOffset
    };
};