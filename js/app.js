const items = [
    {
        id: 1,
        title: 'Title-1',
        imageURL: './images/pic-1.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-1.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 2,
        title: 'Title-2',
        imageURL: './images/pic-2.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-2.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 3,
        title: 'Title-3',
        imageURL: './images/pic-3.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-3.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 4,
        title: 'Title-4',
        imageURL: './images/pic-4.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-4.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 5,
        title: 'Title-5',
        imageURL: './images/pic-5.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-1.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 6,
        title: 'Title-6',
        imageURL: './images/pic-6.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-2.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 7,
        title: 'Title-7',
        imageURL: './images/pic-7.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-3.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 8,
        title: 'Title-8',
        imageURL: './images/pic-8.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-4.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 9,
        title: 'Title-5',
        imageURL: './images/pic-5.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-1.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 10,
        title: 'Title-6',
        imageURL: './images/pic-6.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-2.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 11,
        title: 'Title-7',
        imageURL: './images/pic-7.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-3.',
        price: '5000',
        currency: 'R'
    },
    {
        id: 12,
        title: 'Title-8',
        imageURL: './images/pic-8.jpg',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, beatae-4.',
        price: '5000',
        currency: 'R'
    },
]


/*Make DOM*/

const itemsRoot = document.querySelector('#main .item-block .row')

itemsRoot.innerHTML = `
    ${
    items.map((item, index) => {
        return `
            <div class="col-3 single-item-block ${index}" id= ${index} draggable="true">
                <div class="item">
                        <div class="item-image" style="background-image: url('./images/pic-${index + 1}.jpg')"></div>
                        <div class="item-title">
                            <p>${item.title}</p>
                            <form action="" style="display: none">
                            <input type="hidden"/>
                            <button type="submit" class="change-title">Done</button>      
                            <a href="#" class="cancel">Cancel</a>                   
                            </form> 
                        </div>
                        
                        <div class="item-desc" contenteditable="false">
                            ${item.desc}
                        </div>
                        <div class="item-price"><span>${item.price}</span> <span>${item.currency}</span></div>
                        <div class="item-btn">
                            <button>Buy</button>
                        </div>                    
                    </div>
            </div>
          `
    }).join('')
}       
`

const itemTitle = document.querySelectorAll('.item-title')

itemTitle.forEach((title) => {

    const titleChangeForm = title.querySelector('form')
    const titleChangeInput = title.querySelector('input')
    const titleChangeCancelBtn = title.querySelector('.cancel')

    title.addEventListener('click', () => {
        titleChangeForm.style.display = 'block'
        titleChangeInput.setAttribute('type', 'text')
    })

    titleChangeForm.addEventListener('submit', (e) => {
        e.preventDefault()
        title.querySelector('p').textContent = title.querySelector('input').value
        titleChangeForm.style.display = 'none'
        titleChangeInput.setAttribute('type', 'hidden')
    })

    titleChangeCancelBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        titleChangeForm.style.display = 'none'
    })
})


const storeItems = document.querySelectorAll('.single-item-block')
const storeItemsContainer = document.querySelector('.item-container')

storeItems.forEach((itemToDrag) => {
    itemToDrag.addEventListener('dragstart', () => {
        itemToDrag.classList.add('dragging')
    })

    itemToDrag.addEventListener('dragend', () => {
        itemToDrag.classList.remove('dragging')
    })
})

storeItemsContainer.addEventListener('dragover', (e) => {
    e.preventDefault()
    const draggedItemToPlace = itemToPlace(e.clientX, e.clientY)
    let dragging = document.querySelector('.dragging')
    storeItemsContainer.insertBefore(dragging, draggedItemToPlace)
})


function itemToPlace(x, y) {
    const allDragItems = [...document.querySelectorAll('.single-item-block:not(dragging)')]

    return allDragItems.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offsetX = x - (box.right - box.width / 2)
        const offsetY = y - (box.top - box.height / 2)
        if (offsetX < 0 && offsetX > closest.offsetX) {
            return {offsetX: offsetX, offsetY: offsetY, element: child}
        }
        else {
            return closest
        }
    }, {offsetX: Number.NEGATIVE_INFINITY, offsetY: Number.NEGATIVE_INFINITY}).element
}



