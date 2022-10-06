const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition()
const lang = document.querySelector('select')
// console.log(lang.value)


recognition.interimResults = true
recognition.lang = lang.value

lang.addEventListener('change', () => {
    recognition.lang = lang.value
})

const words = document.querySelector('.words')
let p = document.createElement('p')
words.appendChild(p)

recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
        
    if (recognition.lang === 'ar-EG') {
        p.style.direction = 'rtl'
    } else {
        p.style.direction = 'ltr'
    }
    p.innerText = transcript

    if (e.results[0].isFinal) {
        p = document.createElement('p')
        words.appendChild(p)
    }
})

recognition.addEventListener('end', recognition.start)
recognition.start()
