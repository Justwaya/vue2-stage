import { observe } from "./src/observe/index";

export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(newValue){
      vm[target][key] = newValue
    }
  });
}

function initData(vm) {
  let data = vm.$options.data; //data可能是函数或者是对象
  data = typeof data === "function" ? data.call(vm) : data;
  
  //对数据进行劫持 defineProperty
  observe(data);
  vm._data = data;
  // 将vm_data用vm来代理
  for (let key in data) {
    proxy(vm, "_data", key);
  }
}
