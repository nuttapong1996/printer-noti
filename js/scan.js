document.addEventListener("DOMContentLoaded", function() {        
    LaunchUrl();
    startCamera();
});

    function startCamera() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            scanQRCode();
        })
        .catch(err => {
            qrResult.innerText = "🚨 ไม่สามารถเปิดกล้องได้: " + err;
        });
    }

   async function LaunchUrl() {
        const params = new URLSearchParams(window.location.search);
        const msg = params.get("text"); // สมมติว่าต้องการส่งค่า page
        let url_text = encodeURIComponent(msg+" เริ่มปริ้น\n"+new Date().toLocaleString("th-TH"));
        const jobname = document.getElementById("jobname");
        const page_title = document.getElementById("page_title");
        page_title.innerHTML = msg;
        jobname.innerHTML = msg;

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

    function scanQRCode() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const qrResult = document.getElementById("qrResult");
    // ดึงค่าจาก URL ปัจจุบัน
    const params = new URLSearchParams(window.location.search);
    const page = params.get("text"); // สมมติว่าต้องการส่งค่า page
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                let qrText = code.data;

                // เช็คว่า URL ถูกต้องหรือไม่
                if (qrText.startsWith("https://api.telegram.org")) {
                    // console.log("✅ ลิงก์ Telegram ถูกต้อง กำลังเปิด...");
                    qrResult.innerHTML = `✅ พบ QR Code: <br> <a href="${qrText}" target="_blank">${qrText+page}</a>`;
                    window.open("result.html?url="+qrText+page+" ปริ้นเสร็จแล้ว \n"+new Date().toLocaleString("th-TH"));
                    setTimeout(() => {
                        window.location.href = "index.html"; 
                    }, 1000);
                } else {
                    console.warn("⚠️ QR Code ไม่ใช่ Telegram URL:", qrText);
                }
                return;
            }
        }
        requestAnimationFrame(scanQRCode); // Loop การสแกน
    }
