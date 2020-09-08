// 参考 https://github.com/narayanprusty/Qazy/blob/master/qazy.js

class Qazy {
  constructor(options) {
    if (!window || !document) return
    const defaultConfig = {
      loading: 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
      select: 'body',
      listener: [
        'scroll',
        'wheel',
        'mousewheel',
        'resize',
        'click',
        'animationend',
        'transitionend',
        'transitioncancel',
        'fullscreenchange'
      ],
      filter: null
    }
    this.config = {
      ...defaultConfig,
      ...options
    }
    this.name = 'qazy'
    this._eventFn = this._initListenerImg.bind(this)
    this._throttle = null
    this.timer = 200
    this.view_elements = []
    this._init()
  }
  _init() {
    this._bindEvent()
    this._initListenerImg()
  }
  update(options) {
    this.config = {
      ...this.config,
      ...options
    }
    this._initListenerImg()
  }
  destroy() {
    this.view_elements = []
    this._unBindEvent()
  }
  _initListenerImg() {
    this._qazy_list_maker()
    this._reveal()
  }
  _qazy_list_maker() {
    const { select, loading } = this.config
    let elements = null
    if (typeof select === 'object' && select.nodeType === 1) {
      elements = select.querySelectorAll("img[data-qazy][data-qazy='true']")
    } else {
      elements = document.querySelectorAll(
        `${select} img[data-qazy][data-qazy='true']`
      )
    }
    for (let count = 0; count < elements.length; count++) {
      this.view_elements.push(elements[count])
      elements[count].setAttribute('data-qazy', 'false')

      const source_url = elements[count].src
      elements[count].setAttribute('data-qazy-src', source_url)

      elements[count].src =
        elements[count].getAttribute('data-qazy-placeholder') || loading
    }
  }
  _bindEvent() {
    const { listener } = this.config
    listener.forEach((v) => {
      window.addEventListener(v, this._eventFn, false)
    })
  }
  _unBindEvent() {
    const { listener } = this.config
    listener.forEach((v) => {
      window.removeEventListener(v, this._eventFn, false)
    })
  }
  _reveal() {
    if (this.name !== 'qazy') return
    if (this._throttle) {
      return
    } else {
      this._throttle = true
      setTimeout(() => {
        this._throttle = false
      }, this.timer)
    }
    setTimeout(() => {
      for (let count = 0; count < this.view_elements.length; count++) {
        const temp = this.view_elements[count]
        if (this._elementInView(temp)) {
          if (typeof this.config.filter === 'function') {
            const src = this.view_elements[count].getAttribute('data-qazy-src')
            this.view_elements[count].src = this.config.filter(
              src,
              this.view_elements[count]
            )
          } else {
            this.view_elements[count].src = this.view_elements[count].getAttribute('data-qazy-src')
          }
          // console.log(this.view_elements[count].src)
          this.view_elements.splice(count, 1)
          count--
        } else {
          // console.log("offsetParentTop" + offsetParentTop + " pageYOffset" + pageYOffset + " viewportHeight" + window.innerHeight)
        }
      }
    }, this.timer)
  }
  _elementInView(element) {
    const rect = element.getBoundingClientRect()
    const yInView = rect.top < window.innerHeight && rect.bottom > 0
    const xInView = rect.left < window.innerWidth && rect.right > 0
    return yInView && xInView
  }
}

export default Qazy
