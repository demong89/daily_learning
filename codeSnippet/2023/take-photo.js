// 调取摄像头 并拍照

// window.navigator.mediaDevices // 返回一个对象  方法在这个对象的原型上

// 上面对象上 enumerateDevices() 方法可以返回一个 Promise 对象，
// 该 Promise 对象会在设备列表可用时 resolve，

// navigator.getUserMedia({
//     video: true,
// })

{/* <template>
  <div>
    <button @click="takePhoto">拍照</button>
    <video ref="videoRef"></video>
  </div>
</template> */}

const videoRef = ref<HTMLVideoElement>();
const wrapper = ref<HTMLDivElement>();

const checkCamera = async ()=>{
    const navigator = window.navigator.mediaDevices;
    const devices = await navigator.enumerateDevices();
    if(devices){
        const stream = await navigator.getUserMedia({
            audio: false,
            video:{
                width: 500,
                height: 500,
                // facingMode:{exact: 'environment'} // 后置摄像头

                facingMode: 'user' // 前置摄像头
            }
        });
        if(!videoRef.value) return;
        videoRef.value.srcObject = stream;
        videoRef.value.play();
    }
}


const getImage = ()=>{
    if(!videoRef.value || !wrapper.value) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.value.videoWidth;
    canvas.height = videoRef.value.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
    wrapper.value.appendChild(canvas);

}


