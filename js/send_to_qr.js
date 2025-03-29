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

    LaunchUrl(jobtype , text);

    let url = `scan.html?text=${encodeURIComponent(jobtype + " " + text)}`;
    window.location.href = url;
}

async function LaunchUrl(jobtype , text) {
    let url_text = encodeURIComponent(jobtype+" "+text+" เริ่มปริ้น\n"+new Date().toLocaleString("th-TH"));

    try {
        const response = await fetch('./backend/sendmsg.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({text : url_text})
        });

        if (response.ok) {
            console.log('Data sent successfully');
        }
        
    } catch (error) {
        console.error('Error fetching data:'+ error);
    }
}
