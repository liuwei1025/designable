import { isFn } from './types'

const UNSUBSCRIBE_ID_SYMBOL = Symbol('UNSUBSCRIBE_ID_SYMBOL')

export interface ISubscriber<Payload = any> {
  (payload: Payload): void | boolean
}
/**
 * 发布订阅
 * 订阅不保存eventType dispatch的时候每一个函数都执行 所以再Event引擎中需要通过闭包封装事件和type的关系
 * // TODO: 为什么这么设计 而不是保存key和回调队列
 * 事件的unsubscribe会比较麻烦 需要调用方保存之前的回调方法 才能在回调队列中找到方法并移除
 * 当前的设计可以直接按照id去移除回调
 */
export class Subscribable<ExtendsType = any> {
  private subscribers: {
    index?: number
    [key: number]: ISubscriber
  } = {
    index: 0,
  }

  dispatch<T extends ExtendsType = any>(event: T, context?: any) {
    let interrupted = false
    for (const key in this.subscribers) {
      if (isFn(this.subscribers[key])) {
        event['context'] = context
        if (this.subscribers[key](event) === false) {
          interrupted = true
        }
      }
    }
    return interrupted ? false : true
  }

  subscribe(subscriber: ISubscriber) {
    let id: number
    if (isFn(subscriber)) {
      id = this.subscribers.index + 1
      this.subscribers[id] = subscriber
      this.subscribers.index++
    }

    const unsubscribe = () => {
      this.unsubscribe(id)
    }

    unsubscribe[UNSUBSCRIBE_ID_SYMBOL] = id

    return unsubscribe
  }
  /**
   * 入参函数时 就是上面38行的函数
   * @param id
   * @returns
   */
  unsubscribe = (id?: number | string | (() => void)) => {
    if (id === undefined || id === null) {
      for (const key in this.subscribers) {
        this.unsubscribe(key)
      }
      return
    }
    if (!isFn(id)) {
      delete this.subscribers[id]
    } else {
      delete this.subscribers[id[UNSUBSCRIBE_ID_SYMBOL]]
    }
  }
}
