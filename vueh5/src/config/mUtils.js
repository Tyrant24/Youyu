import moment from 'moment'
/**
 * 本地存储Key加前缀
 */
export const getKey = key => {
  return 'com.mamacollage.lyt_' + key
}

/**
 * 存储localStorage
 */
export const setStore = (key, value) => {
  if (!key) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  key = getKey(key)
  window.localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 */
export const getStore = key => {
  if (!key) return
  key = getKey(key)
  return window.localStorage.getItem(key)
}

/**
 * 删除localStorage
 */
export const removeStore = key => {
  if (!key) return
  key = getKey(key)
  return window.localStorage.removeItem(key)
}

/**
 * string 转 DOM
 */
export const parseToDom = (str) => {
  let div = document.createElement('div')
  if (typeof str === 'string') {
    div.innerHTML = str
  }
  return div.childNodes
}



/**************以为为备用(如果下面方法用到就提到上面，去没用到上线的时候就注释掉)**************/

/**
 * 选取数组前几项
 * @param {array} arr         原始数据
 * @param {number} number     选取长度
 */
export const selectArray = (arr, number) => {
  return arr.filter((item, index) => {
    return index < number
  })
}

/**
 * 默认时间格式 "2018-03-13 17:27:27"
 * 处理更新时间
 */

export const updated_hours = (time) => {
  if (!time) return
  let cur_time = Math.floor((new Date().getTime() - new Date(time).getTime()) / 3600000)
  return (cur_time > 24) ? Math.floor(cur_time / 24) + '天' : cur_time + '小时'
}




/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}


/**
 * 获取/设置元素属性
 */
export function attr(el, arg) {
  if (typeof arg === 'object') {
    for (let property in arg) {
      el.setAttribute(property, arg[property])
    }
  } else {
    return el.getAttribute(arg)
  }
}

/**
 * 获删除元素属性
 */
export function removeAttr(el, attr) {
  el.removeAttribute(attr)
}

/**
 * 增加Class
 */
export function addClass(el, newClass) {
  let classes = attr(el, 'class');

  if (!classes) {
    classes = [];
  } else {
    classes = classes.split(' ');
  }

  if (typeof newClass === 'string') {
    classes.push(newClass);
  } else {
    newClass.forEach((_class) => {
      classes.push(_class);
    });
  }

  attr(el, {
    'class': classes.join(' ')
  });
}

/**
 * 移除Class
 */
export function removeClass(el, remClass) {
  let classes = attr(el, 'class');

  if (!classes) {
    classes = [];
  } else {
    classes = classes.split(' ');
  }

  function _remove(_class) {
    let index = classes.indexOf(_class);

    if (index > -1) {
      classes.splice(index, 1);
    }
  }

  if (typeof remClass === 'string') {
    _remove(remClass);
  } else {
    remClass.forEach((_class) => {
      _remove(_class);
    });
  }

  attr(el, {
    'class': classes.join(' ')
  });
}

/**
 * 是否存在class
 */
export function hasClass(el, className) {
  return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1
}

//获取年龄
export const getAge = (time) => {
  let beginStr = moment(time).format('YYYY-MM-DD')
  let days = moment().diff(beginStr, 'days')
  let duration = moment.duration(days, "days")
  let year = duration.years(),
    month = duration.months(),
    day = duration.days();
  let yearString = year > 0 ? year + '岁' : ''
  let monthString = month > 0 ? month + '月' : ''
  let dayString = day > 0 ? day + '天' : ''
  let result = yearString + monthString + dayString
  return result
}