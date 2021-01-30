const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevents the default behaviour of form submit (i.e. browser refreshing)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.innerText = data.error
            }
    
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})