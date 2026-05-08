const Node = (value, leftNode = null, rightNode = null) => {
    return { value, leftNode, rightNode };
}

const Queue = () => {
    let items = {};
    let headIndex = 0;
    let tailIndex = 0;

    const enque = (item) => {
        items[tailIndex] = item;
        tailIndex++;
    }

    const deque = () => {
        const pulledItem = items[headIndex];
        delete items[headIndex];
        headIndex++;
        return pulledItem;
    }

    const getHeadIndex = () => {
        return headIndex;
    }

    const getTailIndex = () => {
        return tailIndex;
    }

    const getQueue = () => {
        return items;
    }

    return { enque, deque, getHeadIndex, getTailIndex, getQueue }
}

const getHeight = (root) => {
    if (!root) return -1;
    
    let h1 = 1 + getHeight(root.leftNode);
    let h2 = 1 + getHeight(root.rightNode);

    if (h1 >= h2) return h1;
    else return h2;
}

const checkForBalance = (root) => {
    if (!root) return -1;
    
    let h1 = 1 + checkForBalance(root.leftNode);
    let h2 = 1 + checkForBalance(root.rightNode);

    if (h1 === NaN || !h2 === NaN) return false;

    if (h1 >= h2 && (h1 - h2) <= 1) return h1;
    else if (h2 > h1 && (h2 - h1) == 1) return h2;
}

const Tree = (arr) => {
    let sortedArr = mergeSort(arr);
    let root = buildTree(sortedArr);

    const getRoot = () => {
        return root;
    }
    
    const includes = (value) => {
        let head = root;
        while (head) {
            if (value === head.value) return true;
            if (value < head.value) {
                head = head.leftNode;

            } else if (value > head.value) {
                head = head.rightNode;
            }
        }

        return false;
    }

    const insert = (value) => {
        let head = root;
        let prev;

        if (!head.value) {
            root.value = value;
            return;
        }

        while (head) {
            if (value === head.value) return;
            if (value < head.value) {
                prev = head;
                head = head.leftNode;
            } else if (value > head.value) {
                prev = head;
                head = head.rightNode;
            }
        }
        if (value === prev.value) return;
        if (value < prev.value) prev.leftNode = Node(value);
        else if (value > prev.value) prev.rightNode = Node(value);
    }

    const deleteItem = (value) => {
        let head = root;
        let prev;

        if (!head.rightNode && !head.leftNode) {
            if (head.value === value) {
                root.value = null;
                return;
            } else return undefined;
        }

        while (head.rightNode || head.leftNode) {
            if (value === head.value) break;
            prev = head;
            if (value < head.value) {
                prev = head;
                head = head.leftNode;
            } else if (value > head.value) {
                head = head.rightNode;
            }
        }

        if (head.value != value) {
            console.log("Couldn't find item");
            return;
        }

        //Case 1: No Children
        if (!head.leftNode && !head.rightNode) {
            if (prev.leftNode === head) {
                prev.leftNode = null;
            } else if (prev.rightNode === head) {
                prev.rightNode = null;
            }
        } else if (head.leftNode && head.rightNode) {
            //Case 2: Two Children exist
            //Find smallest value in right subtree
            let newHead = head.rightNode;

            if (newHead.leftNode) {
                while (newHead.leftNode) {
                    prev = newHead;
                    newHead = newHead.leftNode;
                }

                head.value = newHead.value;
                prev.leftNode = null;
            } else {
                head.value = newHead.value;
                head.rightNode = newHead.rightNode;
            }
        } else {
            //Case 3: One Child exists
            if (prev.leftNode === head) {
                if (!head.leftNode) prev.leftNode = head.rightNode;
                else prev.leftNode = head.leftNode;
            } else if (prev.rightNode === head) {
                if (!head.leftNode) prev.rightNode = head.rightNode;
                else prev.rightNode = head.leftNode;
            }
        }
    }

    const levelOrderForEach = (callback, head = root, queue = Queue()) => {
        if (typeof callback != 'function') throw new Error("Must pass a function as an argument");

        if (!head) return;

        if (queue.getTailIndex() === 0) queue.enque(head.value);

        let item = queue.deque();
        if (head.leftNode) queue.enque(head.leftNode.value);
        if (head.rightNode) queue.enque(head.rightNode.value);

        callback(item);
        levelOrderForEach(callback, head.leftNode, queue);
        levelOrderForEach(callback, head.rightNode, queue);
    }

    const preOrderForEach = (callback, head = root) => {
        if (typeof callback != 'function') throw new Error("Must pass a function as an argument");

        if (!head) return;

        callback(head.value);
        preOrderForEach(callback, head.leftNode);
        preOrderForEach(callback, head.rightNode);
    }

    const inOrderForEach = (callback, head = root) => {
        if (typeof callback != 'function') throw new Error("Must pass a function as an argument");

        if (!head) return;

        inOrderForEach(callback, head.leftNode);
        callback(head.value);
        inOrderForEach(callback, head.rightNode);
    }

    const PostOrderForEach = (callback, head = root) => {
        if (typeof callback != 'function') throw new Error("Must pass a function as an argument");

        if (!head) return;

        PostOrderForEach(callback, head.rightNode);
        PostOrderForEach(callback, head.leftNode);
        callback(head.value);
    }

    const height = (value) => {
        let head = root;

        while(head) {
            if (head.value === value) break;

            if (value < head.value) head = head.leftNode;
            else if (value > head.value) head = head.rightNode;
        }

        if (!head) return undefined;

        return getHeight(head);
    }

    const depth = (value) => {
        let head = root;
        let index = 0;

        while(head) {
            if (head.value === value) return index;

            if (value < head.value) head = head.leftNode;
            else if(value > head.value) head = head.rightNode;

            index++;
        }

        return undefined;
    }

    const isBalanced = () => {
        
        let head = root;

        let h = checkForBalance(head);

        if (h) return true;
        else return h;
    }

    const rebalance = () => {
        let arr = [];

        inOrderForEach((item) => arr.push(item));

        root = buildTree(arr);
    }

    return { includes, insert, deleteItem, getRoot, levelOrderForEach, preOrderForEach, inOrderForEach, PostOrderForEach, height, depth, isBalanced, rebalance }
}

const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let root = Node(arr[mid], buildTree(arr, start, mid - 1), buildTree(arr, mid + 1, end));
//    Could also do it this way:
//    root.leftNode = buildTree(arr, start, mid - 1);
//    root.rightNode = buildTree(arr, mid + 1, end);

    return root;
}

const mergeSort = (arr, start = 0, end = arr.length - 1) => {
    
    if (start >= end) {
        return [arr[start]];
    }

    let mid = Math.floor((start + end) / 2);

    return merge(mergeSort(arr, start, mid), mergeSort(arr, mid + 1, end));    
}

const merge = (arr1, arr2) => {
    let index1 = 0;
    let index2 = 0;
    let mergedArr = [];

    while (index1 < arr1.length && index2 < arr2.length) {
        if (arr2[index2] > arr1[index1]) {
            mergedArr.push(arr1[index1]);
            index1++;
        } else if (arr1[index1] > arr2[index2]){
            mergedArr.push(arr2[index2]);
            index2++;
        } else if (arr1[index1] === arr2[index2]) {
            mergedArr.push(arr1[index1]);
            index1++;
            index2++;
        }
    }

    while (index1 < arr1.length) {
        mergedArr.push(arr1[index1]);
        index1++;
    }

    while (index2 < arr2.length) {
        mergedArr.push(arr2[index2]);
        index2++;
    }

    return mergedArr;
}

export default Tree;