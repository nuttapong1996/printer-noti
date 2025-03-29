document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", redirectToQR);
});

function redirectToQR(event) {
    event.preventDefault(); // ป้องกันการโหลดหน้าใหม่

    let text = document.getElementById("jobDetail").value.trim();
    let jobtypeElement = document.querySelector('input[name="jobtype"]:checked');

    if (!jobtypeElement) {
        alert("กรุณาเลือกประเภทงาน");
        return;
    }

    let jobtype = jobtypeElement.value; // ดึงค่าหลังจากตรวจสอบว่าเลือกแล้ว

    if (!text) {
        alert("กรุณากรอกรายละเอียดงาน");
        return;
    }

    let url = `scan.html?text=${encodeURIComponent(jobtype + " " + text)}`;
    window.location.href = url;
}
