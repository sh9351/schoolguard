const ADMIN_PASSWORD = 'schoolguard-nofilter'
const FILTERED_URLS = [
    'comic.naver.com',
    'page.kakao.com',
    'novel.naver.com',
    'webtoons.com'
]
const FILTERED_WORDS_URL = ['youtube.com/watch?v=', 'youtube.com/shorts/']
const FILTERED_WORDS = [
    'TXT', '투바투', '투모로우바이투게더', 'TOMORROWXTOGETHER',
    'StrayKids', '스트레이키즈', '스키즈',
    'aespa', '에스파', '아이돌',
    '심야괴담회'
]

console.log('[SchoolGuard] SchoolGuard.js loaded')
Filter()

function Filter() {
    if (location.hash.includes(ADMIN_PASSWORD)) {
        console.log('[SchoolGuard] Admin password verified, filtering disabled')
        return
    }
    const FILTERED_URL = FILTERED_URLS.find(url => location.href.includes(url))
    if (FILTERED_URL) {
        document.head.innerHTML = ''
        document.body.innerHTML = `<h1><b>접근이 차단되었습니다.</b></h1>
        <h2>비업무 유해사이트 "${FILTERED_URL}"의 접근이 차단되었습니다.</h2>
        <h2>자세한 사항은 관리자에게 문의하시기 바랍니다.</h2>
        <h4>인터넷 비업무 유해사이트 차단 솔루션 SchoolGuard</h4>
        
        <style>
            * {
                margin-bottom: -10 !important
            }
        </style>`
    }

    const innerHTML = document.getElementById('below')?.innerHTML?.replaceAll(' ', '')

    if (innerHTML) {
        const FILTERED_WORD = FILTERED_WORDS.find(word => innerHTML.includes(word))
        if (FILTERED_WORDS_URL.find(URL => location.href.includes(URL)) && FILTERED_WORD) {
            document.querySelectorAll('video').forEach(video => {
                video.muted = true
                video.addEventListener('progress', () => {
                    video.pause()
                    video.style.display = 'none'
                })
            })

            document.head.innerHTML = '<title>접근이 차단되었습니다 | SchoolGuard</title>'
            if (!document.getElementById('SchoolGuard-Block')) {
                Array.from(document.body.children).forEach(child => child.style.display = 'none')
                document.body.style.background = 'white'
                document.body.style.height = '100vh'
                const div = document.createElement('div')
                div.setAttribute('id', 'SchoolGuard-Block')
                div.innerHTML = `<h1><b>접근이 차단되었습니다.</b></h1>
                <h2>비업무 유해사이트 "${decodeURIComponent(location.href)}"의 접근이 차단되었습니다.</h2>
                <h2>자세한 사항은 관리자에게 문의하시기 바랍니다.</h2>
                <h2 onclick="location.href = 'https://${location.host}'">돌아가기</h2>
                <h4>인터넷 비업무 유해사이트 차단 솔루션 SchoolGuard</h4>
                
                <style>
                    * {
                        margin-bottom: -10 !important
                    }
                    html::-webkit-scrollbar {
                        display: none;
                    }
                </style>`
                document.body.appendChild(div)
            }
        }
    }
    setTimeout(() => Filter(), 20)
}