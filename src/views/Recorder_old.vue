<template>
  <div>
    <h1>Recorder</h1>
    <br />

    <div v-if="this.seeSelect == true">
      <form>
        <label for="select_audio">Périphérique Audio</label>
        <select
          id="select_audio"
          v-model="this.audioChoice"
          :change="setAudioParams()"
        >
          <option
            v-for="device in this.audioInput"
            :key="device"
            :value="device"
          >
            {{ device.label }}
          </option>
        </select>
        <br />

        <label for="select_audio">Périphérique Vidéo</label>
        <select
          id="select_audio"
          v-model="this.videoChoice"
          :change="setVideoParams()"
        >
          <option
            v-for="device in this.videoInput"
            :key="device"
            :value="device"
          >
            {{ device.label }}
          </option>
        </select>

        <br />
        <button @click.prevent="getDisplay()">Choisir l'écran</button>
      </form>

      <button @click.prevent="reloadStream()">Actualiser</button>
    </div>

    <!--<button @click.prevent="startWebcam()">Start Webcam</button>-->

    <div>
      <video width="400" height="300" autoplay id="myCam"></video>
      <video width="400" height="300" autoplay id="myVideo"></video>
    </div>
    <div>
      <canvas width="400" height="300" id="myCanvas"></canvas>
    </div>
  </div>
</template>
<script>
export default {
  name: "Recorder",
  data() {
    return {
      audioStream: "",
      videoStream: "",
      displayStream: "",
      seeSelect: false,
      audioInput: [],
      audioChoice: "",
      videoChoice: "",
      //displayChoice,
      videoInput: [],
      displayInput: [],
      constraints: {
        video: true,
        audio: true,
      },
      displayMediaOptions: {
        video: {
          cursor: "always",
        },
        audio: false,
      },
    };
  },
  created() {
    //this.getUserMedia();
    //this.getAudioDevices();
    this.main();
  },
  methods: {
    async main() {
      await this.getUserMedia();

      //await this.getDisplay();
    },
    reloadStream() {
      this.seeSelect = true;
      navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
        let video = document.getElementById("myCam");
        video.srcObject = stream;
      });
    },
    setVideoParams() {
      console.log("setVideoParams : " + this.videoChoice.deviceId);
      this.constraints.video = {
        deviceId: this.videoChoice.deviceId,
      };
    },
    setAudioParams() {
      console.log("setAudioParams : " + this.audioChoice.deviceId);
      this.constraints.audio = {
        deviceId: this.audioChoice.deviceId,
      };
    },
    getUserMedia() {
      // Get Permissions

      navigator.mediaDevices.getUserMedia(this.constraints).then(() => {
        console.log("Streaming now");
        this.seeSelect = true;
        this.getDevices();
      });

      /*
      navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
        console.log("Streaming now");
        console.log(stream);
        this.seeSelect = true;
        this.getDevices();
      });
      */
    },
    getDisplay() {
      navigator.mediaDevices
        .getDisplayMedia(this.displayMediaOptions)
        .then((stream) => {
          //this.displayInput = stream;
          let video = document.getElementById("myVideo");
          video.srcObject = stream;
          this.displayStream = stream;

          var canvas = document.querySelector("#myCanvas");
          var ctx = canvas.getContext("2d");
          var canvasVideo = document.querySelector("myVideo");

          ctx.drawImage(canvasVideo, 0, 0);
        });
    },
    getDevices() {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices.forEach((device) => {
          //console.log(device);
          if (device.kind === "audioinput") {
            //console.log(device);
            this.audioInput.push({
              deviceId: device.deviceId,
              kind: device.kind,
              label: device.label,
            });
          }

          if (device.kind === "videoinput") {
            //console.log(device);
            this.videoInput.push({
              deviceId: device.deviceId,
              kind: device.kind,
              label: device.label,
            });
          }
        });
      });
    },
  },
};
</script>
