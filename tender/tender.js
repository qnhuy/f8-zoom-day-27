const list = document.querySelector('.list')

const players = [
    {
        id: 1,
        name: 'Khanh Linh',
        img: 'https://scontent.fhan5-1.fna.fbcdn.net/v/t39.30808-6/509342206_1147463354088119_1983620281693052631_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IQY-fIOMDMgQ7kNvwE1hrRW&_nc_oc=AdkwjgrHrIz-C0hR2WTGf04a_cCyw72ry6hinQxhHeaMAl9P9vI5I6Ma10_OaYXXpTE&_nc_zt=23&_nc_ht=scontent.fhan5-1.fna&_nc_gid=lqKU6cegDc8s8OqV8jOUBg&oh=00_AfM-fn2HG5-RR3NlvL8hQDgvV8BOabpJvJT-e4AL12SKZA&oe=6861FB14'
    },
    {
        id: 2,
        name: 'Yen Nhi',
        img: 'https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/510247496_1145787290922392_1005670366043089514_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=OO_YxzYxVFUQ7kNvwGKxgmq&_nc_oc=AdlpuROSGyWiGUuFR8YOpLujNE2KCqBZIUj7BSwQjRmZOR5ihG-PG67ht45LajWBc4s&_nc_zt=23&_nc_ht=scontent.fhan5-10.fna&_nc_gid=9cCRZmoi6s4A9DSEnNZlTg&oh=00_AfP-2_a1Otg8gqxXK9wUBvqRviGbs0mi-BMUuSYu8_hh4A&oe=6861FE66'
    },
    {
        id: 3,
        name: 'Linh Lan',
        img: 'https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/509268070_1145174127650375_1895431584739100099_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qJVDanmlVF4Q7kNvwEFPJYE&_nc_oc=Adm-yDbGZoY5Dk_kqNiz7OFL347XKaUj8Ya8rYL9QUVLpc7ascdWCG8MlWPpghZBIYw&_nc_zt=23&_nc_ht=scontent.fhan5-8.fna&_nc_gid=CYT7wIhd2_2uROYos2r5cw&oh=00_AfOLkSznAl1YhNmfo5v3NOWdWS8xDXEkEOm53GXHN6Ko5w&oe=6861F0B8'
    },
    {
        id: 4,
        name: 'Trang Anh',
        img: 'https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/512661476_1324588493006376_8763471629031696625_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=P0GIhWznrKMQ7kNvwHZ_EGb&_nc_oc=AdlN6oqCMjm5rHafherAw2HKKP94-JQkTbXwOESakKB2fTiIhJlYzPweFl1hABcOzq4&_nc_zt=23&_nc_ht=scontent.fhan5-10.fna&_nc_gid=rHHJ6_kKBBXsTuku4p_TzA&oh=00_AfPGueqMZl4-rcp2JJKbuHcjo48wlfgwca-WmqXleZt1lQ&oe=68620B16'
    },
    {
        id: 5,
        name: 'Lan Vy',
        img: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/510298961_1321734299958462_1743701617023085278_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=42OKJVRY4QAQ7kNvwHGF0PY&_nc_oc=AdkHl3g6RjkfAug9ODo4Cj2f2d_60hZAhe-poaDGRej3w2A4mGvGkQyUeEb8cU4Nzts&_nc_zt=23&_nc_ht=scontent.fhan5-2.fna&_nc_gid=Sa6_rlaDqcWzucIuR5OzjQ&oh=00_AfPu3FgvhHosN3zMyDz1loLDgYHJziJBb2nlKL2OomCQBQ&oe=68620B42'
    },
]
let liked = [], disliked = []
let isTouching = false
let pointStartX = 0, pointStartY = 0
let currentIndex = players.length

function renderPlayers() {
    players.forEach(friend => {
        const item = document.createElement('div')
        item.className = 'item'
        item.textContent = friend.name
        item.dataset.id = friend.id
        item.style.background = `no-repeat url(${friend.img})`
        item.style.backgroundSize = 'cover'

        list.appendChild(item)
    })
    const playerElement = getCurrentElement()
    playerElement.style.height = '100%'
    playerElement.style.width = '100%'
}
renderPlayers()

function getCurrentElement() {
    return list.querySelector(`[data-id='${currentIndex}']`)
}

function resetReactCss() {
    const likedAction = document.querySelector('.react-item:first-child')
    const dislikedAction = document.querySelector('.react-item:last-child')
    likedAction.classList.remove('hoverd')
    dislikedAction.classList.remove('hoverd')
}

list.ontouchstart = function (e) {
    isTouching = true
    pointStartX = e.changedTouches[0].clientX
    pointStartY = e.changedTouches[0].clientY
}

list.onmousedown = function (e) {
    isTouching = true
    pointStartX = e.clientX
    pointStartY = e.clientY
}

list.ontouchend = function (e) {
    isTouching = false
    const playerElement = getCurrentElement()

    if (playerElement) {
        const distanceX = e.changedTouches[0].clientX - pointStartX

        playerElement.style.transition = 'linear 0.15s'
        if (distanceX <= -150 || distanceX >= 150) {
            let deletedPlayer = players.pop()
            if (distanceX <= -150) {
                playerElement.style.translate = '-100%'
                liked.push(deletedPlayer)
            } else if (distanceX >= 150) {
                playerElement.style.translate = '100%'
                disliked.push(deletedPlayer)
            }
            currentIndex--
            setTimeout(() => playerElement.remove(), 150)
            resetReactCss()
        } else {
            playerElement.style.transform = 'translateX(0) translateY(0) rotate(0)'
            playerElement.style.border = ''
            resetReactCss()
        }
    }
}

list.onmouseup = function (e) {
    isTouching = false
    const playerElement = getCurrentElement()

    if (playerElement) {
        const distanceX = e.clientX - pointStartX

        playerElement.style.transition = 'linear 0.15s'
        if (distanceX <= -150 || distanceX >= 150) {
            let deletedPlayer = players.pop()
            if (distanceX <= -150) {
                playerElement.style.translate = '-100%'
                liked.push(deletedPlayer)
            } else if (distanceX >= 150) {
                playerElement.style.translate = '100%'
                disliked.push(deletedPlayer)
            }
            currentIndex--
            setTimeout(() => playerElement.remove(), 150)
            resetReactCss()
        } else {
            playerElement.style.transform = 'translateX(0) translateY(0) rotate(0)'
            playerElement.style.border = ''
            resetReactCss()
        }
    }
}

list.ontouchmove = function (e) {
    if (isTouching) {
        const playerElement = getCurrentElement()

        if (playerElement) {
            const distanceX = e.changedTouches[0].clientX - pointStartX
            const distanceY = e.changedTouches[0].clientY - pointStartY

            const liked = document.querySelector('.react-item:first-child')
            const disliked = document.querySelector('.react-item:last-child')
            if (distanceX < 0) {
                liked.classList.add('hoverd')
                disliked.classList.remove('hoverd')
                playerElement.style.border = '3px solid green'
            } else if (distanceX > 0) {
                disliked.classList.add('hoverd')
                liked.classList.remove('hoverd')
                playerElement.style.border = '3px solid red'
            }

            playerElement.style.transform = `translateX(${distanceX}px) translateY(${distanceY}px) rotate(${distanceX / 10}deg)`
        }
    }
}

list.onmousemove = function (e) {
    if (isTouching) {
        const playerElement = getCurrentElement()

        if (playerElement) {
            const distanceX = e.clientX - pointStartX
            const distanceY = e.clientY - pointStartY
            
            const liked = document.querySelector('.react-item:first-child')
            const disliked = document.querySelector('.react-item:last-child')
            if (distanceX < 0) {
                liked.classList.add('hoverd')
                disliked.classList.remove('hoverd')
                playerElement.style.border = '3px solid green'
            } else if (distanceX > 0) {
                disliked.classList.add('hoverd')
                liked.classList.remove('hoverd')
                playerElement.style.border = '3px solid red'
            }

            playerElement.style.transform = `translateX(${distanceX}px) translateY(${distanceY}px) rotate(${distanceX / 10}deg)`
        }
    }
}
