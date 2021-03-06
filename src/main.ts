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
const deleteBtns = document.querySelectorAll('.delete-memo');

let userSelection: memoType;
/*
 * create Memo 
 */

window.addEventListener("keydown", (key) => {
    if (key.code === "Escape") closeModal();
});

// creatModal -> show
let showModal = (memoType: memoType) => {
    // change modal content by memoType
    let creatModal = (memoType: memoType) => {
        const innerModal = document?.querySelector('.inner-modal') as HTMLElement;

        const modalTitle = `<span class="memo-title">Titleπ</span>
        <input type="text" id="memo-title">`;

        const modalDescription = `<span class="content-name">Content</span>
        <textarea name="" id="content" cols="30" rows="10"></textarea>`;

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
                throw new Error("μλ ₯ν  μ μλ νμμλλ€.");
            }
        }
    }

    if (modal) {
        creatModal(memoType);
        modal.classList.add('show');
    }
}

let closeModal = () => {
    if (modal) modal.classList.remove('show');
}

// make new memo element by user selection
let writeMemo = () => {

    /* Variables */
    const memoTitle = document.getElementById('memo-title') as HTMLInputElement;
    const content = document.getElementById('content') as HTMLInputElement;
    const url = document.getElementById('url') as HTMLInputElement;

    let addedMemo = document.createElement('addedMemo');

    /* Functions */
    let IsInputNull = (): boolean => {
        if (!memoTitle.value) {
            alert('π μ λͺ©μ μλ ₯ν΄ μ£ΌμΈμ');
            return true;
        }

        if (!content.value) {
            alert('π μ€λͺμ μλ ₯ν΄ μ£ΌμΈμ');
            return true;
        }

        switch (userSelection) {
            case 'img':
            case 'video': {
                if (!url.value) {
                    alert('π URLμ μλ ₯ν΄ μ£ΌμΈμ');
                    return true;
                }
            }
        }
        return false;
    }


    let checkValidURL = (urlType: urlType, url: string): boolean => {
        const splitededArr: string[] = url.split('.');
        const extension = splitededArr[splitededArr.length - 1].toLowerCase();

        if (urlType === "img") {
            if (!IMG_EXTENSION.includes(extension)) {
                alert("μ΄λ―Έμ§κ° μλλλ€. νμ₯μλ₯Ό νμΈν΄ μ£ΌμΈμ.");
                return false;
            }
        } else if (urlType === "video") {
            if (!VIDEO_EXTENSTION.includes(extension) && !url.includes("youtube")) {
                alert("μμμ΄ μλλλ€. νμ₯μλ₯Ό νμΈν΄ μ£ΌμΈμ.");
                return false;
            }
        } else {
            throw new Error("νκΈ°ν  μ μλ νμ₯μμλλ€.");
        }

        return true;
    }

    let makeYoutubeURL = (): string => {
        if (!url.value.includes('embed')) {
            const youtubeURL: string[] = url.value.split('=');
            const youtubeUrlID = youtubeURL[youtubeURL.length - 1];
            return `https://www.youtube.com/embed/` + youtubeUrlID;
        }
        return url.value;
    };

    let makeAddedMemo = (): string => {
        let addedByMemoType = ``;
        let enableEnterContent = content.value;

        switch (userSelection) {
            case 'img': {
                addedByMemoType = `<img class="memo-img" src="${url.value}"></img>`;
                break;
            }
            case 'video': {
                let urlContent = url.value;
                if (url.value.includes('youtube')) urlContent = makeYoutubeURL();
                addedByMemoType = `<iframe class="memo-video"  allow="fullscreen;" src="${urlContent}"></iframe>`;
                break;
            }
            case 'todo': {
                enableEnterContent = `π£ ` + enableEnterContent.replace(/(?:\r\n|\r|\n)/g, '<br/>π£ ');
            }
        }

        return `<div class="memo" draggable="true" alt="text">
        <img class="delete-memo"></img>
        ${addedByMemoType}
        <div class="title-content">
            <h5>Title</h5>
            <h6 class="memo-title">${memoTitle.value}</span>
                <h5>Content</h5>
                <span class="content">${enableEnterContent}</span>
        </div>
    </div>`;
    };

    /* Runπ₯ */
    if (IsInputNull()) return;

    switch (userSelection) {
        case 'img': {
            if (!checkValidURL('img', url.value)) return;
            break;
        }
        case 'video': {
            if (!checkValidURL('video', url.value)) return;
            break;
        }
    }

    alert("κΈ°λ‘λμμ΅λλ€π§ββοΈ");
    addedMemo.innerHTML = makeAddedMemo();
    if (addedMemo.children[0]) {
        addEventListerToNewMemo(addedMemo.children[0]);
        memoContainer?.appendChild(addedMemo.children[0]);
    };

    memoTitle.value = "";
    content.value = "";
    closeModal();
}

let addEventListenerToDeleteBtn = (deleteBtn: Element) => {
    deleteBtn.addEventListener('click', () => {
        if (confirm('λ©λͺ¨λ₯Ό μ­μ ν κΉμ?')) {
            const deletedMemo = deleteBtn.closest('.memo');
            deletedMemo?.remove();
        };
    });
};
/*
* addEventListner
*/

let addEventListerToNewMemo = (memo: Element) => {
    memo.addEventListener('dragstart', () => {
        memo.classList.add('dragging');
    });

    memo.addEventListener('dragend', () => {
        memo.classList.remove('dragging');
    });

    const deleteBtn = memo.querySelector('.delete-memo');
    if (deleteBtn) addEventListenerToDeleteBtn(deleteBtn);
}

memos.forEach(memo => {
    addEventListerToNewMemo(memo);
});

deleteBtns.forEach((deleteBtn) => {
    addEventListenerToDeleteBtn(deleteBtn);
});
/*
 * Sortable 
 */

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