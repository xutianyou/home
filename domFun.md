<div id="id" class="class"></div>

// 获取dom中的类'class'
const dom = document.getElementsByTagName('id')[0]

dom.getAttribute('class')


// 获取类名为'class'的dom
querySelector('class')

addEventListener('scroll', ev => {
    console.log('dom高度', ev.target.scrollHeight)
    console.log('滚动条顶端距离', ev.target.scrollTop)
    console.log('滚动条高度', ev.target.clientHeight)
}, false)