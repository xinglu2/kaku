const $button = $('#shift')
const $theme = $('.theme')
// jQuery.preloadImages = function () {
//     for (let i = 0; i < arguments.length; i++) {
//         $("<img/>").attr('src', arguments)
//     }
// }
// $.preloadImages('./images/dark.png').prepend($('#globalLogo'))
let k = 1

const PC = window.matchMedia('(min-width:500px)')
const sidebarHeight = () => {
    if (PC.matches) {
        $('.sidebar').height(window.screen.availHeight)
    }
}
sidebarHeight()
const mediaQuery = window.matchMedia('(max-width:500px)')
$('.menu').click(() => {
    $('.sidebar-main').css('display', 'block')
    $('.content').css('filter', 'blur(0.8rem)')
})
const $sidebarMain = $('.sidebar-main')
const moveChange = () => {
    if (mediaQuery.matches) {
        $('.content').on('click', () => {
            $sidebarMain.css('display', 'none')
            $('.content').css('filter', 'blur(0)')
        })
        $('.sidebar-item').on('click', () => {
            $sidebarMain.css('display', 'none')
            $('.content').css('filter', 'blur(0)')
        })

    }
}
moveChange()

const $lastList = $('.lastList')
const $lastLi = $lastList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' },
    { logo: 'B', logoType: 'text', url: 'https://www.bilibili.com/' },
    { logo: 'G', logoType: 'text', url: 'https://www.google.com/' }

]
const removePre = (url) => {
    return url.replace("http://", '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $lastList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li id="touchArea">
            <div class="site theme">
                <div class="logo theme">${node.logo[0]}</div>
                <div class="link">${removePre(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-delete"></use>
                    </svg>
                </div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', (e) => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是:')
        // console.log(url)
        const firstLetter = removePre(url)[0].toUpperCase()
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: firstLetter,
            logoType: 'text',
            url: url
        });
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)//就是一个key，一个value,key可以随便写
}
$(document).on('keypress', (e) => {
    console.log(e)
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
console.log($('#touchArea>.theme'))
$button.on('click', () => {
    if (k === 1) {
        $theme.addClass('active')
        $('#touchArea>.theme').addClass('active')
        $('#shiftIcon').attr('href','#icon-dark')
        k = 0
    } else {
        $theme.removeClass('active')
        $('#touchArea>.theme').removeClass('active')
        $('#shiftIcon').attr('href','#icon-light')
        k = 1
    }
})
$('.mount').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({
          scrollTop: targetOffset
        },
          500);
        return false;
      }
    }
  });
