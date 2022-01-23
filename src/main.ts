/*
*
* Vairables
*
*/

const IMG_EXTENSION: string[] = ['jpg', 'jpeg', 'gif', 'png', 'tif', 'tiff', 'raw', 'bmp', 'rle', 'dib', 'heic'];
const VIDEO_EXTENSTION: string[] = ['avi', 'mp4', 'mkv', 'wmv', 'mov', 'flv'];

type memoType = 'text' | 'img' | 'video' | 'todo';
type urlType = 'img' | 'video';

const modal = document?.querySelector('.modal');
const modalCloseBtn = modal?.querySelector('.close');
const memoContainer = document.querySelector('.memo-container');
const memos = document.querySelectorAll('.memo');

let userSelection: memoType;
/*
*
* Modal
*
*/

window.addEventListener("keydown", (key) => {
    if (key.code === "Escape") closeModal();
});

let showModal = (memoType: memoType) => {
    let creatModal = (memoType: memoType) => {
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
            case 'text':
            case 'todo': {
                innerModal.innerHTML = modalTitle + modalDescription + btns;
                break;
            }

            case 'img':
            case 'video': {
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
    let checkValidURL = (urlType: urlType, url: string): boolean => {
        const splitededArr: string[] = url.split('.');
        const extension = splitededArr[splitededArr.length - 1].toLowerCase();

        if (urlType === "img") {
            if (!IMG_EXTENSION.includes(extension)) {
                alert("이미지가 아닙니다. 확장자를 확인해 주세요.");
                return false;
            }
        } else if (urlType === "video") {
            if (!VIDEO_EXTENSTION.includes(extension) || !url.includes("youtube")) {
                alert("영상이 아닙니다. 확장자를 확인해 주세요.");
                return false;
            }
        } else {
            throw new Error("표기할 수 없는 확장자입니다.");
        }

        return true;
    }

    let makeAddedMemo = () => { };


    const memoTitle = document.getElementById('memo-title') as HTMLInputElement;
    const content = document.getElementById('content') as HTMLInputElement;
    const url = document.getElementById('url') as HTMLInputElement;
    let addedMemo = document.createElement('addedMemo');


    switch (userSelection) {
        case 'text': {
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

        case 'img': {
            if (!checkValidURL('img', url.value)) return;

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
        case 'video': {
            break;
        }
        case 'todo': {
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