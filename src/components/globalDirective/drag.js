function setMousedown (el, binding) {
  const parentClientRect = el.parentElement.getBoundingClientRect(); // 获取当前拖拽dom的父元素
  const _width = parentClientRect.width;
  const _height = parentClientRect.height;

  el.onmousedown = function(e) {
    el.style.outline = '3px solid red';

    let onmousedownLeft = e.clientX - el.offsetLeft;
    let onmousedownTop = e.clientY - el.offsetTop;

    document.onmousemove = function(e){
      const clientLeft = e.clientX - onmousedownLeft;
      const scrollWidth = _width - el.scrollWidth;

      const clientTop = e.clientY - onmousedownTop;
      const scrollHeight = _height - el.scrollHeight;

      let styleLeft = 0;
      let styleTop = 0;

      if (clientLeft > 0 && clientLeft < scrollWidth) {
        styleLeft = clientLeft;
      } else if (clientLeft > 0 && clientLeft >= scrollWidth) {
        styleLeft = scrollWidth;
      } else {
        styleLeft = 0
      }

      if (clientTop > 0 && clientTop < scrollHeight) {
        styleTop = clientTop;
      } else if (clientTop > 0 && clientTop >= scrollHeight) {
        styleTop = scrollHeight
      } else {
        styleTop = 0
      }

      el.style.left = styleLeft + 'px';
      el.style.top = styleTop + 'px';
    };

    document.onmouseup = function(){
      el.style.outline = 'none';

      if (binding.value.change !== undefined) {
        let left, top;
        if (el.style.left.indexOf('px') > -1) {
          left = el.style.left.replace('px', '') / _width * 100;
        } else if (el.style.left.indexOf('%') > -1) {
          left = el.style.left.replace('%', '');
        }

        if (el.style.top.indexOf('px') > -1) {
          top = el.style.top.replace('px', '') / _height * 100;
        } else if (el.style.top.indexOf('%') > -1) {
          top = el.style.top.replace('%', '');
        }

        binding.value.change(left, top)
      }
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}
/*
  v-drag="{ state: true, left: 0, top: 0, change: (left, top) => {} }"
*/ 
export default {
  name: 'drag',
  bind (el, binding) {
    // 只调用一次，指令第一次绑定到元素时调用
    el.style.userSelect = 'none';
    el.style.position = 'absolute';
    
    if ( binding.value.left !== undefined ) {
      el.style.left = binding.value.left + '%';
    }
    if ( binding.value.top !== undefined ) {
      el.style.top = binding.value.top + '%';
    }
  },
  inserted (el, binding) {
    // 被绑定元素插入父节点时调用
    const parent = el.parentElement;
    parent.style.userSelect = 'none';
    parent.style.position = 'relative';

    if (binding.value.state !== undefined && binding.value.state) {
      el.style.cursor = 'move';
      setMousedown(el, binding)
    } else {
      el.style.cursor = 'auto';
    }
  },
  update (el, binding) {
    if (binding.value.state !== undefined) {
      if (binding.value.state) {
        el.style.cursor = 'move';
        setMousedown(el, binding)
      } else {
        el.style.cursor = 'auto';
        el.onmousedown = null;
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }
  },
  unbind (el) {
    // 只调用一次，指令与元素解绑时调用
    el.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
  }
}