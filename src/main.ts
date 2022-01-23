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
const modal = document?.querySelector('.modal');
const modalCloseBtn = modal?.querySelector('.close');
const memoContainer = document.querySelector('.memo-container');
const memos = document.querySelectorAll('.memo');

let userSelection = 0;
/*
*
* Modal
*
*/

window.addEventListener("keydown", (key) => {
    if (key.code === "Escape") closeModal();
});

let showModal = (memoType: number) => {
    let creatModal = (memoType: number) => {
        const innerModal = document?.querySelector('.inner-modal') as HTMLElement;

        const modalTitle = `<span class="memo-title">Title👑</span>
        <input type="text" id="memo-title">`;

        const modalDescription = `<span class="content-name">Content</span>
        <input type="text" id="content">`;

        const url = `<span class="url">URL</span>
        <input type="text" id="url">`;

        const btns = `<div class="btns">
        <button class="write" onclick="writeMemo()">write</button>
        <button class="close" onclick="closeModal()">close</button>
    </div>`;

        userSelection = memoType;

        switch (memoType) {
            case 0:
            case 3: {
                innerModal.innerHTML = modalTitle + modalDescription + btns;
                break;
            }

            case 1:
            case 2: {
                innerModal.innerHTML = modalTitle + modalDescription + url + btns;
                break;
            }

            default: {
                throw new Error("입력할 수 없는 타입입니다.");
            }
        }
    }


    if (modal != null) {
        creatModal(memoType);
        modal.classList.add('show');
    }
}

let closeModal = () => {
    if (modal != null) modal.classList.remove('show');
}

let writeMemo = () => {
    let checkValidImg = (url: string): boolean => {
        const splitededArr: string[] = url.split('.');
        const extension = splitededArr[splitededArr.length - 1].toLowerCase();
        const IMG_EXTENSION: string[] = ['jpg', 'jpeg', 'gif', 'png', 'tif', 'tiff', 'raw', 'bmp', 'rle', 'dib', 'heic'];

        if (!IMG_EXTENSION.includes(extension)) {
            alert("이미지 확장자가 아닙니다. 확장자를 확인해 주세요.");
            return false;
        }
        return true;
    }
    const memoTitle = document.getElementById('memo-title') as HTMLInputElement;
    const content = document.getElementById('content') as HTMLInputElement;
    const url = document.getElementById('url') as HTMLInputElement;
    let addedMemo = document.createElement('addedMemo');


    switch (userSelection) {
        case 0: {
            addedMemo.innerHTML = `<div class="memo" draggable="true" alt="text">
    <img class="delete-memo"></img>
    <div class="title-content">
        <h5>Title</h5>
        <h6 class="memo-title">${memoTitle.value}</span>
            <h5>Content</h5>
            <span class="content">${content?.value}</span>
    </div>
</div>`;
            break;
        }

        case 1: {
            if (!checkValidImg(url.value)) return;

            addedMemo.innerHTML = `<div class="memo" draggable="true" alt="img">
            <img class="delete-memo"></img>
            <img class="memo-img" src="${url.value}"></img>
            <div class="title-content">
                <h5>Title</h5>
                <h6 class="memo-title">${memoTitle.value}</span>
                    <h5>Content</h5>
                    <span class="content">${content?.value}</span>
            </div>
        </div>`;
            break;
        }
        case 2: {
            break;
        }
        case 3: {
            break;
        }

    }


    memoContainer?.appendChild(addedMemo);

    memoTitle.value = "";
    content.value = "";
    closeModal();
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