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
      asyncObj: {
        type: Promise,
        default: () => {
          return null
        }
      }
    },
    data(){
      return {
        state: false,
        text: "按钮",
        timeHandler: null
      }
    },
    watch: {
      asyncObj(newObj){
        if(newObj){
          this.toggleState(true)
          newObj
            .catch(() => {
              this.toggleState(false)
            })
            .finally(() => {
              this.toggleState(false)
            })
        }
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
      toggleState(bool) {
        this.state = bool != undefined ? bool : !this.state
      }
    }
  })
}



export default addGlobComp

