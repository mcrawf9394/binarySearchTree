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
        this.build(leftSide, prevNode)
        this.build(rightSide, prevNode)
        return root
    }
    build (array, prevNode) {
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
        this.build(leftSide, prevNode)
        this.build(rightSide, prevNode)
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

    }
    isBalanced () {

    }
    height (node) {

    }
    depth (node) {

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
            if (currentNode.value > value) {
                currentNode = currentNode.left
            }
            else {
                currentNode = currentNode.right
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

    }
    inOrder (callback) {

    }
    preOrder (callback) {

    }
    postOrder (callback) {

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
stuff.deleteItem(2)
console.log(stuff.find(980))
console.log (stuff.root)