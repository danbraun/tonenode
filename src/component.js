export default (text = 'Hello World', func) => {
    const element = document.createElement('button')

    element.innerHTML = text
    
    element.addEventListener('click', func)

    return element
}
