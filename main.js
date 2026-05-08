import Tree from "./app.js";

const genArr = () => {
    let arr = [];
    let randomNum = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i <= randomNum; i++) {
        let randomNum2 = Math.floor(Math.random() * (100 - 1)) + 1;
        arr.push(randomNum2);
    }

    return arr;
}

const built = Tree([37, 93]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

prettyPrint(built.getRoot());
console.log(built.isBalanced());
built.levelOrderForEach((item) => console.log('Level Order: ' + item));
built.preOrderForEach((item) => console.log('Pre Order: ' + item));
built.inOrderForEach((item) => console.log('In Order: ' + item));
built.PostOrderForEach((item) => console.log('Post Order: ' + item));
built.deleteItem(900);
prettyPrint(built.getRoot());
built.insert(104);
built.insert(103);
built.insert(517);
built.insert(278);
prettyPrint(built.getRoot());
console.log('Height: ' + built.height(built.getRoot().value));
console.log(built.isBalanced());
/*built.deleteItem(104)
built.rebalance();
console.log('Height: ' + built.height(built.getRoot().value));
console.log(built.isBalanced());
prettyPrint(built.getRoot());
built.levelOrderForEach((item) => console.log('Level Order: ' + item));
built.preOrderForEach((item) => console.log('Pre Order: ' + item));
built.inOrderForEach((item) => console.log('In Order: ' + item));
built.PostOrderForEach((item) => console.log('Post Order: ' + item));*/
