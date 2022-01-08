const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {
        logo: "A", url: 'https://www.acfun.cn'
    },
    {
        logo: "B", url: 'https://www.bilibili.com'
    }
];
const removeUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <a href="${node.url}">
            <div class="site">
                <div class="logo">
                ${node.logo[0]}
                </div>
                <div class="link">${removeUrl(node.url)}</div >
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close-circle"></use>
                    </svg>
                </div>   
            </div >
            </a >
        </li > `).insertBefore($lastLi)


        $li.on('click', '.close', (e) => {

            e.preventDefault()
            hashMap.splice(index, 1)
            render();
        })

    })
}

render();



$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问输入您要添加的网址：')
        if (url.indexOf('http') != 0) {
            url = 'http://' + url
        }
        console.log(url)
        hashMap.push({
            logo: url.replace('https://', '').replace('http://', '').replace('www.', '')[0],

            url: url
        })

        render();


    });



window.onbeforeunload = () => {

    const string = JSON.stringify(hashMap)

    localStorage.setItem('x', string)
}



$(document).on('keypress', (e) => {
    const key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})


