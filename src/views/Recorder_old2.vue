<template>
  <div>
    <h1>Recorder</h1>

    <br />

    <div>
      <form>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"
            ><i class="fa-solid fa-clapperboard"></i
          ></span>
          <select @change="selectTypeofRecord()" v-model="typeofRecord">
            <option value="1">Screen and Camera</option>
            <option value="2">Screen Only</option>
            <option value="3">Camera Only</option>
          </select>
        </div>

        <div class="form-check form-switch select_params">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault"
            ><i class="fa-solid fa-video"></i
          ></label>

          <select
            id="select_audio"
            v-model="this.videoChoice"
            :change="setVideoParams()"
          >
            <option value="false">Aucun</option>
            <option
              v-for="device in this.videoInput"
              :key="device"
              :value="device"
            >
              {{ device.label }}
            </option>
          </select>
        </div>

        <div class="form-check form-switch select_params">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label class="form-check-label" for="flexSwitchCheckDefault"
            ><i class="fa-solid fa-microphone"></i
          ></label>

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
        </div>

        <br />

        <button @click.prevent="startWebcam()">Démarrer webcam</button>

        <br />
        <button @click.prevent="getDisplay()">Choisir l'écran</button>
      </form>
    </div>

    <button
      class="btn btn-success"
      @click.prevent="record()"
      v-if="this.mediaRecorder == null"
    >
      Start Record
    </button>
    <button
      class="btn btn-danger"
      @click.prevent="stopRecord()"
      v-if="this.mediaRecorder != null"
    >
      Stop Record
    </button>

    <div>
      <video
        id="webcam"
        volume="0"
        ref="webcam"
        width="1"
        height="1"
        autoplay
      ></video>
      <!--<video id="display" ref="display" width="1" height="1" autoplay></video>-->
      <video id="display" ref="display" width="1" height="1"></video>
    </div>
    <div>
      <canvas
        width="1280"
        id="canvas"
        height="720"
        style="border: 1px solid #000000"
        ref="canvas"
      >
      </canvas>
    </div>

    <video
      controls
      id="previewVideo"
      ref="previewVideo"
      width="300"
      height="200"
      autoplay
    ></video>
  </div>
</template>
<script>
import axios from "axios";
console.log("Hello");

/*
var video = document.getElementById("live");
var display = document.getElementById("display");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //changed this line to "canvas.getContext('2d')".
//timer = setInterval(function () {
*/

export default {
  name: "Recorder",
  data() {
    return {
      // Selection Webcam and Micro
      typeofRecord: null,

      // Others
      mediaRecorder: null,
      chunks: [],
      canvas: null,
      ctx: null,
      isDrawing: null,
      webcamStream: "",
      displayStream: "",
      audioInput: [],
      audioStream: null,
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
  mounted() {
    var vm = this; // cache
    vm.canvas = vm.$refs.canvas;
    vm.ctx = vm.canvas.getContext("2d");
    vm.canvas.addEventListener("load", vm.onLoad);
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
    selectTypeofRecord() {
      console.log("selectTypeofRecord()");

      if (this.typeofRecord === "1") {
        // Screen and Camera
        console.log("// Screen and Camera");
      }
    },

    stopRecord() {
      //vm.mediaRecorder.stop();
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
    },
    record() {
      console.log("recording ...");
      var vm = this;
      var chunks = [];

      var canvaStream = vm.canvas.captureStream(30);
      canvaStream.addTrack(this.webcamStream.getAudioTracks()[0]);
      console.log(canvaStream);

      /*
      const options = {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: "video/webm",
      };
      */
      const options = {
        mimeType: "video/webm",
        videoMaximizeFrameRate: true,
      };
      vm.mediaRecorder = new MediaRecorder(canvaStream, options);
      this.mediaRecorder = vm.mediaRecorder;

      vm.mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      vm.mediaRecorder.onstop = function () {
        var blob = new Blob(chunks, { type: "video/webm" });
        console.log(blob);

        const file = new File([blob], "filename.webm", {
          type: blob.type,
          lastModified: new Date().getTime(),
        });

        console.log(file);

        var formData = new FormData();

        formData.append("myfile", file);

        //console.log(vm.$store.state.gconfig.url_upload_file);

        // http://localhost:3000/upload_file
        // vm.$store.state.gconfig.url_upload_file
        try {
          axios.post(vm.$store.state.gconfig.url_upload_file, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          /*
        await axios({
          url: "http://localhost:3000/api",
          method: "post",
          data: formData,
          header: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            //'Authorisation': 'Bearer ' +variable
          },
        });
        */
        } catch (err) {
          console.log(err);
        }

        //var file = new File(blob, "myVideo.webm");
        //console.log(file);

        //console.log(chunks);
        chunks = []; // Reset chunks
        var videoURL = URL.createObjectURL(blob);
        //var previewVideo = this.$refs.previewVideo;
        var previewVideo = document.getElementById("previewVideo");

        console.log(previewVideo);
        previewVideo.src = videoURL;
        console.log(videoURL);
      };

      vm.mediaRecorder.start();
      this.onLoad();
    },
    onLoad() {
      var vm = this;
      var webcam = vm.$refs.webcam;
      var display = vm.$refs.display;

      setInterval(function () {
        // Draw Display
        vm.ctx.drawImage(display, 0, 0, 1280, 720);
        // Draw Webcam
        vm.ctx.drawImage(webcam, 0, 0, 426, 240);
      }, 1);

      /*
      var video = document.getElementById("live");
      var display = document.getElementById("display");
      setInterval(function () {
        // Draw Display
        this.ctx.drawImage(display, 0, 0, 800, 500);
        // Draw Webcam
        this.ctx.drawImage(video, 0, 0, 250, 150);
      }, 1);
      */
    },
    startWebcam() {
      this.seeSelect = true;
      navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
        let video = document.getElementById("webcam");
        video.srcObject = stream;
        this.webcamStream = stream;

        //console.log(stream);
        //console.log(stream.getTracks());
        //const myAudioTrack = stream.getAudioTracks();
        //console.log(myAudioTrack[0].getSettings());
      });

      this.onLoad();
    },
    setVideoParams() {
      //console.log("setVideoParams : " + this.videoChoice.deviceId);
      this.constraints.video = {
        deviceId: this.videoChoice.deviceId,
      };
    },
    setAudioParams() {
      //console.log("setAudioParams : " + this.audioChoice.deviceId);
      this.constraints.audio = {
        deviceId: this.audioChoice.deviceId,
      };

      navigator.mediaDevices
        .getUserMedia({
          audio: { deviceId: this.audioChoice.deviceId },
        })
        .then((audioStream) => {
          //console.log(audioStream);
          this.audioStream = audioStream;
        });
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
          let video = document.getElementById("display");
          video.srcObject = stream;
          this.displayStream = stream;
        });

      this.onLoad();
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

<style scoped>
.select_params {
  display: inline-block;
  margin-left: 10px;
}

.select_params select {
  width: 200px;
  margin-left: 10px;
}
</style>
