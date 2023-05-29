// 重写数组中的部分方法
let oldArrayProto = Array.prototype //获取数组的原型

Object.create(oldArrayProto)    //该创建方式是将属性添加到原型下