class Queue {
  constructor(length, queue){
    this.maxLength = length
    this.queue = queue && Array.isArray(queue) ? queue : []
  }
  add(elem){
    if(this.queue.length < this.maxLength){
      this.queue.push(elem)
    }else{
      this.queue.shift()
      this.queue.push(elem)
    }
  }
  removeByIndex(index){
    if(index > this.queue.length - 1) return
    this.queue.splice(index, 1)
  }
  removeByElem(elem){
    let index = this.queue.indexOf(elem)
    if(index > -1) this.queue.splice(index, 1)
  }
  clear(){
    this.queue = []
  }
  isInQueue(elem){
    return this.queue.indexOf(elem) > -1
  }
}

export {
  Queue
}
