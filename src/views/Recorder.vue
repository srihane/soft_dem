<template>
  <div>
    <h1>Recorder</h1>

    <br />

    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1"
          ><i class="fa-solid fa-clapperboard"></i
        ></span>
        <select v-model="this.typeOfRecord" @change="selectTypeOfRecord()">
          <option value="1">Screen and Camera</option>
          <option value="2">Camera Only</option>
        </select>

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
      </div>

      <form>
        <div class="select_params">
          <!--
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            v-model="this.activeWebcam"
          />
          -->
          <label class="form-check-label" for="flexSwitchCheckDefault"
            ><i class="fa-solid fa-video"></i
          ></label>

          <select
            id="select_video"
            v-model="this.videoChoice"
            @change="setVideoParams($event)"
          >
            <option value="off">Off</option>
            <option
              v-for="device in this.videoInput"
              :key="device"
              :value="device"
            >
              {{ device.label }}
            </option>
          </select>
        </div>

        <div class="select_params">
          <!--
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            v-model="this.activeAudio"
          />
          -->
          <label class="form-check-label" for="flexSwitchCheckDefault"
            ><i class="fa-solid fa-microphone"></i
          ></label>

          <select
            id="select_audio"
            v-model="this.audioChoice"
            :change="setAudioParams()"
          >
            <option value="off">Off</option>
            <option
              v-for="device in this.audioInput"
              :key="device"
              :value="device"
            >
              {{ device.label }}
            </option>
          </select>
        </div>

        <!--<div class="form-check form-switch select_params">-->
        <div
          class="select_params"
          v-if="this.typeOfRecord == '1' || this.typeOfRecord == '3'"
        >
          <!--
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            v-model="this.activeDisplay"
          />
          -->

          <label class="form-check-label" for="flexSwitchCheckDefault"
            ><i class="fa-solid fa-desktop"></i
          ></label>
          <button
            class="btn btn-dark btn-sm"
            style="margin-left: 10px"
            @click.prevent="getDisplay()"
          >
            Choisir l'??cran
          </button>
        </div>

        <br />

        <!--<button @click.prevent="startWebcam(true)">D??marrer webcam</button>-->
      </form>
    </div>

    <div>
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
        <video id="display" ref="display" width="1" height="1" autoplay></video>
      </div>
      <div>
        <canvas
          :width="this.format.canva.width"
          :height="this.format.canva.height"
          id="canvas"
          style="border: 1px solid #000000"
          ref="canvas"
        >
        </canvas>
      </div>

      <div>
        <h2>Preview :</h2>
        <video
          controls
          id="previewVideo"
          ref="previewVideo"
          width="300"
          height="200"
        ></video>
        <div>
          <button class="btn btn-success" @click="sendRecord()">
            Valider l'enregistrement
          </button>
        </div>
      </div>
    </div>

    <div v-if="this.typeOfRecord == '2'"></div>
  </div>
</template>
<script>
import axios from "axios";

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
      // Format of canvas and camera
      format: {
        canva: {
          width: 1280,
          height: 720,
        },
        webcam: {
          width: 390,
          height: 240,
        },
        display: {
          width: 1280,
          height: 720,
        },
      },
      // Selection Webcam and Micro
      typeOfRecord: "1",
      activeWebcam: false,
      activeAudio: false,
      activeDisplay: false,

      // Media Recorder
      mediaRecorder: null,
      chunks: [],
      fileVideo: null,

      // Canvas
      canvas: null,
      ctx: null,
      isDrawing: null,

      // Streams vm
      webcamStream: "",
      displayStream: "",
      audioStream: null,

      videoInput: [],
      audioInput: [],
      audioChoice: "",
      videoChoice: "",

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
  },

  created() {
    this.main();
  },
  methods: {
    async main() {
      await this.getUserMedia();
    },
    selectTypeOfRecord() {
      /*
      format: {
        canva: {
          width: 1280,
          height: 720,
        },
        webcam: {
          width: 390,
          height: 240,
        },
        display: {
          width: 1280,
          height: 720,
        },
      },
      */

      /*
      RESOLUTION TAB
      480p 720x480 
      720p 1280x720 
      1080p 1920x1080 
      */

      if (this.typeOfRecord === "1") {
        // Screen and Camera
        this.format = {
          canva: {
            width: 1280,
            height: 720,
          },
          webcam: {
            width: 360,
            height: 240,
          },
          display: {
            width: 1280,
            height: 720,
          },
        };
      }

      if (this.typeOfRecord === "2") {
        // Camera Only
        this.format = {
          canva: {
            width: 720,
            height: 480,
          },
          webcam: {
            width: 720,
            height: 480,
          },
          display: {
            width: 0,
            height: 0,
          },
        };
      }
    },
    sendRecord() {
      var vm = this;
      var formData = new FormData();
      formData.append("myfile", vm.fileVideo);

      // http://localhost:3000/upload_file
      // vm.$store.state.gconfig.url_upload_file

      try {
        axios.post(vm.$store.state.gconfig.url_upload_file, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            // Accept: "application/json",
            // 'Authorisation': 'Bearer ' +variable
          },
        });
      } catch (err) {
        console.log(err);
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
      canvaStream.addTrack(this.audioStream.getAudioTracks()[0]);
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

        vm.fileVideo = new File([blob], "filename.webm", {
          type: blob.type,
          lastModified: new Date().getTime(),
        });
        console.log(vm.fileVideo);

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
      this.drawCanva();
    },
    drawCanva() {
      var vm = this;
      var webcam = vm.$refs.webcam;
      var display = vm.$refs.display;

      console.log("drawCanva");
      console.log(vm.format.webcam.width);

      setInterval(function () {
        // Draw Display
        // vm.ctx.drawImage(display, 0, 0, 1280, 720);
        vm.ctx.drawImage(
          display,
          0,
          0,
          vm.format.canva.width,
          vm.format.canva.height
        );

        // Draw Webcam
        // vm.ctx.drawImage(webcam, 0, 0, 420, 200);
        vm.ctx.drawImage(
          webcam,
          0,
          0,
          vm.format.webcam.width,
          vm.format.webcam.height
        );
      }, 1);
    },
    startWebcam(state) {
      console.log(state);

      if (state == true) {
        navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
          let video = document.getElementById("webcam");
          video.srcObject = stream;
          this.webcamStream = stream;

          this.drawCanva();

          //console.log(stream);
          //console.log(stream.getTracks());
          //const myAudioTrack = stream.getAudioTracks();
          //console.log(myAudioTrack[0].getSettings());
        });
      } else if (state === false) {
        // D??sactivate user camera

        let video = document.getElementById("webcam");
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });

        this.clearCanvas();

        this.drawCanva();
        console.log(this.webcamStream);

        /*
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        */
      }
    },
    setVideoParams(e) {
      let selected = e.target.value;
      console.log(selected);

      if (selected === "off") {
        // User want to disable Video Camera
        this.startWebcam(false);
      } else {
        console.log("setVideoParams : " + this.videoChoice.deviceId);
        this.constraints.video = {
          deviceId: this.videoChoice.deviceId,
        };
        this.startWebcam(true);
      }
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

      navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
        console.log("Streaming now");

        stream.getTracks().forEach(function (track) {
          track.stop();
        });

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

      this.drawCanva();
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
    clearCanvas() {
      let video = document.getElementById("webcam");
      video.src = "";
      video.srcObject = null;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
