class nodes {
    constructor (value) {
        this.value = value
        this.left = null
        this.right = null
    }
}
class tree {
    constructor (array) {
        this.root = this.buildTree(array)
    }
    buildTree (array) {
        let sortedArray = this.mergeSort(array)
        let middle = Math.floor(sortedArray.length/2)
        let leftSide = sortedArray.slice(0, middle)
        let root = new nodes (sortedArray[middle])
        let prevNode = root
        let rightSide = sortedArray.slice(middle + 1)
        function build (array, prevNode) {
            if (array.length <= 0) {
                return
            }
            let mid = Math.floor(array.length/2)
            let newNode = new nodes (array[mid])
            if (prevNode.value > newNode.value) {
                prevNode.left = newNode
            }
            else {
                prevNode.right = newNode
            }
            prevNode = newNode
            let leftSide = array.slice(0, mid)
            let rightSide = array.slice(mid + 1)
            build(leftSide, prevNode)
            build(rightSide, prevNode)
        }
        build(leftSide, prevNode)
        build(rightSide, prevNode)
        return root
    }
    mergeSort (array) {
        if (array.length < 2) {
            return array
        }
        let middle = Math.floor(array.length / 2)
        let leftArray = array.slice(0, middle)
        let rightArray = array.slice(middle)
        return (this.merge(this.mergeSort(leftArray), this.mergeSort(rightArray)))
    }
    merge (leftArray, rightArray) {
        let sortedArray = []
        while (leftArray.length && rightArray.length) {
            if (leftArray[0] < rightArray[0]) {
                sortedArray.push(leftArray.shift())
            }
            else if (leftArray[0] > rightArray[0]) {
                sortedArray.push(rightArray.shift())
            }
            else {
                sortedArray.push(rightArray.shift())
                leftArray.splice(0, 1)
            }
        }
        return [...sortedArray, ...leftArray, ...rightArray]
    }
    rebalance () {
        let array = this.inOrder()
        let newArray = []
        array.forEach(object => {
            newArray.push(object.value)
        })
        let newTree = this.buildTree(newArray)
        this.root = newTree
        return newTree
    }
    isBalanced () {
        let currentNode = this.root
        let maxHeight = this.height(currentNode)
        function getMinHeight (node) {
            let i = 0
            if (node === null) {
                return i
            }
            let leftHeight =  getMinHeight(node.left)
            let rightHeight = getMinHeight(node.right)
            if (leftHeight < rightHeight) {
                return i = leftHeight + 1
            }
            else {
                return i = rightHeight + 1
            }
        }
        let minHeight = getMinHeight(currentNode)
        let check = maxHeight - minHeight
        if (check > 1) {
            return console.log("the tree is not balanced")
        }
        else {
            return console.log("the tree is balanced")
        } 
    }
    height (node) {
        let currentNode = this.find(node.value)
        function heights (node) {
            let i = 0
            if(node === null) {
                return i = i - 1
            }
            let leftHeight = heights(node.left)
            let rightHeight = heights(node.right)
            if (leftHeight > rightHeight) {
                return i = leftHeight + 1
            }
            else { 
                return i = rightHeight + 1
            }
        }
        return heights(currentNode)
    }
    depth (node) {
        let currentNode = this.root
        let i = 0
        while (currentNode) {
            if (currentNode.value == node.value) {
             return i   
            }
            else if (currentNode.value > node.value) {
                currentNode = currentNode.left
                i++
            }
            else {
                currentNode = currentNode.right
                i++
            }
        }
        return "This node does not exist"
    }
    find (value) {
        let currentNode = this.root
        while (currentNode) {
            if (currentNode.value == value) {
                return currentNode
            }
            else {
                if (currentNode.value > value) {
                    currentNode = currentNode.left
                }
                else {
                    currentNode = currentNode.right
                }
            }
        }
        return "There is not such value"
    }
    insert (value) {
        let currentNode = this.root
        while (currentNode.left || currentNode.right) {
            console.log(currentNode)
            if (currentNode.value > value) {
                if (currentNode.left) {
                    currentNode = currentNode.left
                }
                else {
                    break
                }
            }
            else {
                if (currentNode.right) {
                    currentNode = currentNode.right
                }
                else {
                    break
                }
            }
        }
        let newNode = new nodes (value)
        if (currentNode.value > value) {
            currentNode.left = newNode
        }
        else {
            currentNode.right = newNode
        }
    }
    levelOrder (callback) {
        let levelOrderArray = []
        let queue = []
        let currentNode = this.root
        queue.push(currentNode)
        while (queue.length > 0) {
            if (currentNode.left) {
                queue.push(currentNode.left)
            }
            if (currentNode.right) {
                queue.push(currentNode.right)
            }
            levelOrderArray.push(queue[0])
            queue.splice(0, 1)
            currentNode = queue[0]
        }
        if (callback) {
            levelOrderArray.forEach(node => {
                callback(node)
            });
        }
        else {
            return levelOrderArray
        }
    }
    inOrder (callback) {
        let inOrderArray = []
        let currentNode = this.root
        function inOrderRec (node) {
            if(node === null) {
                return
            }
            inOrderRec(node.left)
            inOrderArray.push(node)
            inOrderRec(node.right)
        }
        inOrderRec(currentNode)
        if (callback) {
            inOrderArray.forEach(node => {
                callback(node)
            })
        }
        else {
            return inOrderArray
        }
    }
    preOrder (callback) {
        let currentNode = this.root
        let preOrderArray = []
        function preOrderRec (node) {
            if (node === null) {
                return
            }
            preOrderArray.push(node)
            preOrderRec(node.left)
            preOrderRec(node.right)
        }
        preOrderRec (currentNode)
        if (callback) {
            preOrderArray.forEach(node => {
                callback(node)
            })
        }
        else {
            return preOrderArray
        }
    }
    postOrder (callback) {
        let currentNode = this.root
        let postOrderArray = []
        function postOrderRec (node) {
            if (node === null) {
                return
            }
            postOrderRec(node.right)
            postOrderRec(node.left)
            postOrderArray.push(node)
        }
        postOrderRec(currentNode)
        if (callback) {
            postOrderArray.forEach(node => {
                callback(node)
            })
        }
        else {
            return postOrderArray
        }
    }
    deleteItem(value){
        let currentNode = this.root
        let prevNode
        let contains = false
        while (currentNode) {
            if (currentNode.value > value) {
                prevNode = currentNode
                currentNode = currentNode.left
            }
            else if (currentNode.value < value) {
                prevNode = currentNode
                currentNode = currentNode.right
            }
            else {
                contains = true
                break
            }
        }
        if (contains === false){
            console.log("No such item exists")
        }
        else {
            if (currentNode.left) {
                console.log("Im working on it")
            }
            else if (currentNode.right) {
                console.log("Im working on it")
            }
            else {
                if (prevNode.left === currentNode) {
                    prevNode.left = null
                }
                else {
                    prevNode.right = null
                }
            }
        }
    }
}
stuff = new tree ([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
stuff.insert(2)
stuff.insert(980)
stuff.insert(24)
stuff.insert(67)
stuff.insert(92)
stuff.insert(88)
console.log(stuff.find(980))
let something = new nodes(8)
console.log(stuff.depth(something))
console.log(stuff.height(something))
console.log(stuff.levelOrder())
console.log(stuff.inOrder())
console.log(stuff.preOrder())
console.log(stuff.postOrder())
stuff.isBalanced()
console.log (stuff.root)
console.log(stuff.rebalance())
stuff.isBalanced()