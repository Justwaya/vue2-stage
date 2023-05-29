class Observe {
  constructor(data) {
    // Object.defineProperty只能劫持已经存在的属性,后增的、或则删除的不会劫持

    if (Array.isArray(data)) {
      // 重写数组中的 7个 方法，是可以修改数组本身的
      // data.__proto__ =  //需要保留数组原有的特性，并且可以重写部分方法
      this.observeArray(data)   //如果数组中放置的是对象，可以监控到对象的变化
    } else {
      this.walk(data);
    }
  }
  walk(data) {
    //循环对象 对属性依次劫持
    // "重新定义" 属性
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
  }
  observeArray(data){
    data.forEach(item=>{
      observe(item)
    })
  }
}

export function defineReactive(target, key, value) {
  observe(value); //对所有的对象进行属性劫持
  //闭包  属性劫持
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue);
      value = newValue;
    },
  });
}

export function observe(data) {
  if (typeof data != "object" || data == null) {
    return; //只对对象进行劫持
  }

  // 如果一个对象被劫持过了，那就不需要再被劫持 (要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断是否被劫持)
  return new Observe(data);
}
