const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const inputColor = document.querySelector('.input__color');
const tools = document.querySelectorAll('.button-too');
const sizeButton = document.querySelectorAll('.button_size');
const buttonClear = document.querySelector('.button__clear')

let brushSize = 20;

let isPaint = false; //variável para que o pincel possa desenhar;

let activetool = "brush";

inputColor.addEventListener('change', () => {
    ctx.fillStyle = inputColor.value;

})


console.log(inputColor.value)

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isPaint = true

    if (activetool == "brush") {
        draw(clientX, clientY);
    }
    if (activetool == "rubber") {
        clear(clientX, clientY);

    }

    //mouseDown, é o que vai acontecer quando eu apertar o meu mouse;
    canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
        if (isPaint) {
            if (activetool == "brush") {
                draw(clientX, clientY);

            }
            if (activetool == "rubber") {
                clear(clientX, clientY);

            }
        }
    });
});
canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
    isPaint = false;
    //mouseup, é o que vai acontecer quando eu soltar o meu mouse;
});




const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over"

    ctx.beginPath() // para criar um novo elemento;

    //para criar um arco com o canvas:
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI


    );
    ctx.fill() //para preencher o arco!

}

const clear = (x, y) => {

    ctx.globalCompositeOperation = "destination-out"

    ctx.beginPath() // para criar um novo elemento;

    //para criar um arco com o canvas:
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI


    );
    ctx.fill() //para preencher o arco!

}

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button"); // essa função closest("") vai nos retorna retornar o elemento mais proximo daquele no qual foi clicado
    const action = selectedTool.getAttribute("data-action")


    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"))
        selectedTool.classList.add("active")
        activetool = action
    }

}
const selectSize = ({ target }) => {
    const selectedSize = target.closest("button"); // essa função closest("") vai nos retorna retornar o elemento mais proximo daquele no qual foi clicado
    const size = selectedSize.getAttribute("data-size")
    console.log(size)

    sizeButton.forEach((tool) => tool.classList.remove("active"))
    selectedSize.classList.add("active")
    brushSize = size

}

tools.forEach((tool) => {
    tool.addEventListener('click', selectTool)
})
sizeButton.forEach((size) => {
    size.addEventListener('click', selectSize)
})

buttonClear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})


