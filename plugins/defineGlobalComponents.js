import Vue from 'vue'

function addGlobComp(){
  /**
   * 商品列表页面相关全局组件
   */
  Vue.addGlobComp('product_list', 'table_operation_component',{
    props: {
      row: {
        type: Object | String
      },
      index: {
        type: String | Number
      }
    },
    render: function(createElement) {
      let btnElem1 = createElement(
        'el-button',
        {
          attrs: {
            type: 'primary'
          },
          on: {
            // this指向当前button组件
            click: ($event) => {
              this.$emit('emitEvent', {
                type: 'edit',
                data: {
                  b: 111
                }
              })
            }
          },
        },
        ['编辑']
      );

      let btnElem2 = createElement(
        'el-button',
        {
          attrs: {
            type: 'success'
          },
          on: {
            // this指向当前button组件
            click: ($event) => {
              this.$emit('emitEvent', {
                type: 'del',
                data: {
                  b: 111
                }
              })
            }
          },
        },
        ['删除']
      );

      let btnElem3 = createElement(
        'el-button',
        {
          attrs: {
            type: 'info'
          },
          on: {
            // this指向当前button组件
            click: ($event) => {
              this.$emit('emitEvent', {
                type: 'cancel',
                data: {
                  b: 111
                }
              })
            }
          },
        },
        ['取消']
      );

      return createElement(
        'div',
        {
          'class': {
            btns: true
          },
        },
        [btnElem1, btnElem2, btnElem3]
      )
    },
  })

  Vue.addGlobComp('product_list', 'table_user_component',{
    props: {
      row: {
        type: Object | String
      },
      index: {
        type: String | Number
      }
    },
    render: function(createElement) {
      let slotComp = createElement(
        'div',
        {
          class: {
            'name-wrapper': true,
          },
          slot: 'reference',
        },
        ['编辑']
      );
      let pElem = createElement(
        'p',
        ['文字提示']
      );

      return createElement(
        'el-popover',
        {
          attrs: {
            trigger: "hover",
            placement: "top"
          },
        },
        [pElem, slotComp]
      )
    },
  })

  Vue.addGlobComp('product_list', 'form_input',{
    props: {
      row: {
        type: Object | String
      },
      index: {
        type: String | Number
      }
    },
    render: function(createElement) {
      return createElement(
        'el-input',
        {
          attrs: {
            trigger: "hover",
            placement: "top"
          },
        }
      )
    },
  })
  /**
   * 商品列表页面相关全局组件
   */

  Vue.addGlobComp('button', {
    props: {
      queue: {
        type: Array,
        default: function(){
          return []
        }
      },
      params: {
        type: Object,
        default: function(){
          return {}
        }
      },
      formatterParams: {
        type: Function
      },
      requestType: {
        type: String,
        default: 'queue'  // queue 串行  parallel 并行
      }
    },
    data(){
      return {
        state: false,
        text: "按钮"
      }
    },
    render: function(createElement) {
      return createElement(
        'el-button',
        {
          class: 'mood',
          on: {
            click: () => {
              if(!this.state){
                this.$emit('click')
                this.toggleState(true)
                this.runQueue()
              }
            }
          },
          attrs: {
            loading: this.state
          }
        },
        [this.text]
      )
    },
    methods: {
      async runQueue(){ // params：传给list中第一个promise对象的参数
        let params
        try{
          params = this.formatterParams ? await this.formatterParams.apply(this.$parent) : (this.params ? this.params : {})
        }catch(e){
          console.error(e)
          this.toggleState(false)
          return
        }

        let p = Promise.resolve(params);
        if(this.requestType == 'queue'){
          p = this.queue.reduce((origin, item) => {
            return origin.then((res) => {// res是上一个promise对象传过来的结果
              return new Promise(async (resolve, reject) => {
                await item(res, resolve, reject)
              })
            });
          }, p)
          p.finally(() => {
            this.toggleState(false)
          })
        }else{
          p.then((params) => {
            let promiseArr = []
            this.queue.forEach((item) => {
              promiseArr.push(new Promise(async (resolve, reject) => {
                await item(params, resolve, reject)
              }))
            })
            Promise.all(promiseArr)
              .finally(() => {
                this.toggleState(false)
              })
          })
        }
      },
      toggleState(bool) {
        this.state = bool != undefined ? bool : !this.state
      }
    }
  })
}



export default addGlobComp

