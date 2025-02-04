const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// เช็คว่าผู้ใช้เคยเลือกธีมไว้หรือยัง
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
}

// เพิ่มฟังก์ชันเปลี่ยนธีม
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// ฟังก์ชันสำหรับซ่อนและแสดง footer เมื่อเลื่อนหน้าเว็บ
let lastScrollTop = 0;
const footer = document.getElementById('footer');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // เลื่อนลง
        footer.classList.add('footer-hidden');
    } else {
        // เลื่อนขึ้น
        footer.classList.remove('footer-hidden');
    }
    lastScrollTop = scrollTop;
});

document.addEventListener('mousemove', function(event) {
    if ((window.innerHeight - event.clientY) < 50) {
        // เมาส์อยู่ใกล้ด้านล่างของหน้าเว็บ
        footer.classList.remove('footer-hidden');
    }
});

// เรียกใช้งาน EmailJS
emailjs.init("YaWnWpXdTwWozZm5pZ4uCO");

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const recaptchaResponse = grecaptcha.getResponse(); // รับค่าจาก reCAPTCHA
    if (!recaptchaResponse) {
        alert("❌ กรุณายืนยันว่าคุณไม่ใช่บอท (คลิกที่ reCAPTCHA)");
        return;
    }

    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        "g-recaptcha-response": recaptchaResponse, // ส่งค่า reCAPTCHA ไปที่ EmailJS
    };

    emailjs.send("service_rqv76tv", "template_jndwjr1", templateParams)
        .then(function(response) {
            alert("✅ ส่งข้อความสำเร็จ!");
            document.getElementById("contact-form").reset();
            grecaptcha.reset(); // รีเซ็ต reCAPTCHA
        }, function(error) {
            alert("❌ เกิดข้อผิดพลาด!");
        });
});
