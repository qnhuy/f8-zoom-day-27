const textarea = document.querySelector('#textarea')
const preview = document.querySelector('#website-preview')
const contextMenu = document.querySelector('.context-modal')

textarea.addEventListener('input', renderHtml)
window.addEventListener('beforeunload', handleBeforeUnload)
textarea.addEventListener('contextmenu', handleContextMenu)
document.addEventListener('mousedown', hideMenuWhenMouseDown)


function renderHtml() {
    preview.srcdoc = textarea.value.trim()
}

function handleBeforeUnload(e) {
    if (!textarea.value.trim()) return
    e.returnValue = 'message'
}

function handleContextMenu(e) {
    e.preventDefault()

    handleMenuPosition(e)
    showMenu()
    handleOption()
}

function showMenu() {
    contextMenu.classList.add('show')
}

function handleMenuPosition(e) {
    contextMenu.style.top = `${
        (e.pageY + contextMenu.offsetHeight) > innerHeight ?
        e.pageY - contextMenu.offsetHeight :
        e.pageY}px`
    contextMenu.style.left = `${e.pageX}px`
}

function handleOption() {
    function selectAll() {
        textarea.focus()
        textarea.select()
    }

    function clear() {
        textarea.value = ''
        preview.srcdoc = ''
    }

    const selectBtn = contextMenu.querySelector('.context--select-all')
    selectBtn.onclick = () => selectAll()

    const clearBtn = contextMenu.querySelector('.context--clear')
    clearBtn.onclick = () => clear()
}

function hideMenuWhenMouseDown() {
    contextMenu.classList.remove('show')
}