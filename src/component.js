export const startButton =(text = 'START', func) => {
    const element = document.createElement('button')
    element.innerHTML = text
    element.addEventListener('click', func)

    return element
}

export const stopButton = (text = 'STOP', func) => {
    const element = document.createElement('button');
    element.innerHTML = text
    element.addEventListener('click', func)

    return element
}