const $ = document.querySelector.bind(document)

const textarea = $('#textarea')
const preview = $('#website-preview')
const contextMenu = $('.context-modal')

textarea.addEventListener('input', renderHtml)
window.addEventListener('beforeunload', handleBeforeUnload)
document.addEventListener('contextmenu', handleContextMenu)
document.addEventListener('mousedown', handleMouseDown)

//render html in iframe by textarea input
function renderHtml() {
    preview.srcdoc = textarea.value.trim()
}

//handle when unload
function handleBeforeUnload(e) {
    if (!textarea.value.trim()) return
    e.preventDefault()
    e.returnValue = true
}

//handle context menu
function handleContextMenu(e) {
    e.preventDefault()
    showMenu()
    handleMenuPosition(e)
    handleOptions()
}

//handle context menu position
function handleMenuPosition(e) {
    contextMenu.style.top = `${(e.pageY + contextMenu.offsetHeight) > innerHeight ? //if X click point + menu height > window height
        innerHeight - contextMenu.offsetHeight : //then return window height - menu height
        e.pageY}px` //else reuturn X click point

    contextMenu.style.left = `${e.pageX + contextMenu.offsetWidth > innerWidth ?
        innerWidth - contextMenu.offsetWidth :
        e.pageX}px`
}

//show context menu
function showMenu() {
    contextMenu.classList.add('show')
}

function hideMenu() {
    contextMenu.classList.remove('show')
}

//handle options of context menu
function handleOptions() {
    const selectAllBtn = contextMenu.querySelector('.context--select-all')
    const clearBtn = contextMenu.querySelector('.context--clear')

    selectAllBtn.addEventListener('click', selectAll)
    clearBtn.addEventListener('click', clear)

    //select all the code
    function selectAll(e) {
        e.preventDefault()
        textarea.focus()
        textarea.select()
        hideMenu()
    }

    //clear all the code
    function clear(e) {
        e.preventDefault()
        textarea.value = ''
        preview.srcdoc = ''
        hideMenu()
    }
}

//hide current context menu when mouse down
function handleMouseDown(e) {
    // if (!contextMenu.contains(e.target)) showMenu()
    console.log(e.target)
    if (!contextMenu.contains(e.target)) hideMenu()
}