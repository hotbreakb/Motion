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
* Modal
*
*/

const memoList = Array<memo>();

const modal = document?.querySelector('.modal');
const modalCloseBtn = modal?.querySelector('.close');

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