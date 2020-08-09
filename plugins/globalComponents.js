import Vue from 'vue'
import addGlobComp from './defineGlobalComponents'

/**
 * 全局组件管理器
 */
class GlobalComponents {
  constructor(namespaces){
    this.namespaces = namespaces || {}
  }

  /**
   * 添加全局组件
   * @param namespace: 命名空间
   * @param compName: 组件名称
   * @param params: 定义全局组件的参数，必须包含render
   */
  add(namespace, compName, params){
    if(arguments.length == 1){
      console.error("定义全局组件至少传入两个参数")
      return
    }
    if(!params || !params.render || typeof params.render != 'function'){
      console.log(compName)
      console.log(params)
      console.error("定义全局组件必须传入render函数")
      return
    }
    this.namespaces.namespace = this.namespaces.namespace || {}
    if(this.namespaces.namespace[compName]){
      console.error("命名空间：" + namespace + '已存在同名组件---' + compName)
      return
    }else{
      this.namespaces.namespace[compName] = true
      Vue.component(namespace + "_" + compName, params)
    }
  }
}
let globCompNameSpaces = new GlobalComponents()


Vue.addGlobComp = function(namespace, compName, params){
  if(arguments.length == 2){
    params = compName
    compName = namespace
    namespace = 'global'
  }
  globCompNameSpaces.add(namespace, compName, params)
}


addGlobComp()
