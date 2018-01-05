class EventEmiter{
  constructor(){
    this.subscriptions = new Map()
  }
  subscribe(subscriptor, message, callback){
    if(!this.subscriptions.has(message)) this.subscriptions.set(message, new Map())
    const msgSubs = this.subscriptions.get(message)
    msgSubs.set(subscriptor, callback)
  }
  unsubscribe(subscriptor, message){
    if(!this.subscriptions.has(message)) return
    const msgSubs = this.subscriptions.get(message)
    if(!msgSubs.has(subscriptor)) return
    msgSubs.delete(subscriptor)
    if(msgSubs.size == 0) this.subscriptions.delete(message)
  }
  emit(message, ...args){
    if(!this.subscriptions.has(message)) return
    const msgSubs = this.subscriptions.get(message)
    for (const callback of msgSubs.values()) {
      callback(...args)
    }
  }
}

const emiter = new EventEmiter

export default emiter