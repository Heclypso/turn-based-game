const continueButton = document.getElementById('continue-button').addEventListener('click', () => {
    const menu = document.getElementById('menu')
    const form = document.getElementById('form')
    menu.classList.add('menu--hidden')
    form.classList.remove('form--hidden')
})
