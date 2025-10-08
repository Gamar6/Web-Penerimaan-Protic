// === Smooth Scroll for internal links ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})

// === Join Button with Click Effect ===
const joinBtn = document.querySelector('.join-btn')
if (joinBtn) {
  joinBtn.addEventListener('click', (e) => {
    e.preventDefault()

    // Tambah animasi klik
    joinBtn.classList.add('clicked')
    setTimeout(() => {
      window.location.href = 'form.html'
    }, 500) // delay biar animasi kelihatan
  })
}

// === Fade-in on scroll ===
const faders = document.querySelectorAll('.section-title, .division-card, .about-card')

const appearOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px',
}

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('fade-in')
    observer.unobserve(entry.target)
  })
}, appearOptions)

faders.forEach((fader) => {
  appearOnScroll.observe(fader)
})

// === Hover effect for division items ===
document.querySelectorAll('.division-item').forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('active')
  })
  item.addEventListener('mouseleave', () => {
    item.classList.remove('active')
  })
})

// === Splash Screen Transition ===
window.addEventListener('load', () => {
  const landing = document.getElementById('landingPage')
  const main = document.querySelector('.main-content')

  if (landing && main) {
    setTimeout(() => {
      // kasih efek fade out
      landing.classList.add('fade-out')

      // setelah transisi selesai -> tampilkan main
      landing.addEventListener(
        'transitionend',
        () => {
          landing.style.display = 'none'
          main.classList.add('show')
        },
        { once: true }
      )
    }, 2500) // 2.5 detik splash screen
  }
})

// === Divisi Selection (max 2) ===
const divisionButtons = document.querySelectorAll('.division-btn')
let selectedDivisions = []

divisionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const division = button.dataset.division

    // Kalau sudah dipilih -> unselect
    if (selectedDivisions.includes(division)) {
      selectedDivisions = selectedDivisions.filter((d) => d !== division)
      button.classList.remove('active')
    }
    // Kalau belum dipilih dan < 2
    else if (selectedDivisions.length < 2) {
      selectedDivisions.push(division)
      button.classList.add('active')
    }
    // Kalau lebih dari 2 -> alert
    else {
      alert('Kamu hanya bisa memilih maksimal 2 divisi!')
    }

    console.log('Divisi terpilih:', selectedDivisions)
  })
})

// === Tambahkan hidden input agar divisi ikut terkirim ===
const form = document.querySelector('.registration-form')
form.addEventListener('submit', (e) => {
  // sebelum submit, hapus dulu input lama
  form.querySelectorAll("input[name='divisions[]']").forEach((el) => el.remove())

  // tambahkan input hidden untuk tiap divisi
  selectedDivisions.forEach((div) => {
    const hiddenInput = document.createElement('input')
    hiddenInput.type = 'hidden'
    hiddenInput.name = 'divisions[]'
    hiddenInput.value = div
    form.appendChild(hiddenInput)
  })
})
