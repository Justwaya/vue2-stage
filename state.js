import { observe } from "./src/observe/index";

export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
}
function initData(vm) {
  let data = vm.$options.data; //data可能是函数或者是对象
  data = typeof data === "function" ? data.call(vm) : data;

  vm._data = data;
  console.log(vm);
  //对数据进行劫持 defineProperty
  observe(data);
  console.log('返回类',observe(data));
}
