(function(e){function t(t){for(var a,n,i=t[0],r=t[1],l=t[2],u=0,b=[];u<i.length;u++)n=i[u],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&b.push(o[n][0]),o[n]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);d&&d(t);while(b.length)b.shift()();return c.push.apply(c,l||[]),s()}function s(){for(var e,t=0;t<c.length;t++){for(var s=c[t],a=!0,i=1;i<s.length;i++){var r=s[i];0!==o[r]&&(a=!1)}a&&(c.splice(t--,1),e=n(n.s=s[0]))}return e}var a={},o={app:0},c=[];function n(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=a,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(s,a,function(t){return e[t]}.bind(null,a));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],r=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var d=r;c.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"0229":function(e,t,s){e.exports=s.p+"img/signup_img.1d03013c.jpg"},"0955":function(e,t,s){"use strict";s("c91d")},"43fb":function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);var a=s("7a23");function o(e,t,s,o,c,n){const i=Object(a["x"])("Menu"),r=Object(a["x"])("router-view");return Object(a["q"])(),Object(a["e"])(a["a"],null,[Object(a["h"])(i),Object(a["h"])(r)],64)}var c=s("bc3a"),n=s.n(c);const i={class:"navbar navbar-expand-lg bg-light"},r={class:"container-fluid"},l=Object(a["f"])("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[Object(a["f"])("i",{class:"fa-solid fa-bars"})],-1),d={class:"collapse navbar-collapse",id:"navbarSupportedContent"},u={class:"navbar-nav me-auto mb-2 mb-lg-0"},b={class:"nav-item"},p=Object(a["f"])("li",{class:"nav-item"},[Object(a["f"])("a",{class:"nav-link active","aria-current":"page",href:"/Recorder"},"Créer Vidéo")],-1),f={key:0,class:"d-flex justify-content-end"},m={class:"navbar-nav me-auto mb-2 mb-lg-0"},h={class:"nav-item"},O={class:"nav-item"},j={key:1,class:"d-flex justify-content-end"},v=Object(a["f"])("ul",{class:"navbar-nav me-auto mb-2 mb-lg-0"},[Object(a["f"])("li",{class:"nav-item"},[Object(a["f"])("a",{class:"btn btn-success",href:"/Account"},"Mon compte")])],-1),g=[v];function _(e,t,s,o,c,n){const v=Object(a["x"])("router-link");return Object(a["q"])(),Object(a["e"])("div",null,[Object(a["f"])("nav",i,[Object(a["f"])("div",r,[Object(a["g"])(" Demasoft "),l,Object(a["f"])("div",d,[Object(a["f"])("ul",u,[Object(a["f"])("li",b,[Object(a["h"])(v,{class:"nav-link active",to:"/"},{default:Object(a["E"])(()=>[Object(a["g"])("Home")]),_:1})]),p]),null===this.$store.state.userData?(Object(a["q"])(),Object(a["e"])("div",f,[Object(a["f"])("ul",m,[Object(a["f"])("li",h,[Object(a["h"])(v,{class:"nav-link",to:"/Signup"},{default:Object(a["E"])(()=>[Object(a["g"])("Signup")]),_:1})]),Object(a["f"])("li",O,[Object(a["h"])(v,{class:"btn btn-primary",to:"/Signin"},{default:Object(a["E"])(()=>[Object(a["g"])("Signin")]),_:1})])])])):Object(a["d"])("",!0),null!=this.$store.state.userData?(Object(a["q"])(),Object(a["e"])("div",j,g)):Object(a["d"])("",!0)])])])])}var y={name:"Menu",components:{},data(){return{message:"Actif"}}},w=s("6b0d"),k=s.n(w);const S=k()(y,[["render",_]]);var C=S;s("f33e");var R={name:"App",components:{Menu:C},methods:{verifyTimeoutSessionStorage(){if(sessionStorage.getItem("userData")){const t=JSON.parse(sessionStorage.getItem("userData"));console.log(t);const s=new Date(t.timeout);let a=s.getDate();console.log(a);const o=new Date;if(console.log(o.getDate()),o.getDate()===a){console.log("Session à jour"),this.$store.state.userData=t.user_data;const s={user_mail:t.user_data.user_mail,user_password:t.user_data.user_password};try{n.a.post(this.$store.state.gconfig.url_signin,s,{headers:{"Content-Type":"application/json"}}).then(e=>{this.serverResponse=e.data,this.submitClick=!1,200===e.data.status&&(this.$store.state.userData=e.data.user_data)})}catch(e){console.log(e)}}else console.log("délai session dépassé"),sessionStorage.removeItem("userData"),this.$store.state.userData=null}else console.log("Aucune session présente"),this.$store.state.userData=null}},created(){this.verifyTimeoutSessionStorage()}};s("cd18");const D=k()(R,[["render",o]]);var x=D,I=s("5502");let M=s("be6f");const q=new I["a"].Store({state:{gconfig:M,userData:null},getters:{},mutations:{},actions:{}});var P=q,E=s("6605");const V={class:"container"},U=Object(a["f"])("h1",null,"Home",-1),T=[U];function $(e,t,s,o,c,n){return Object(a["q"])(),Object(a["e"])("div",V,T)}var A={name:"Home",data(){return{data:""}},computed:{},methods:{}};const F=k()(A,[["render",$]]);var B=F;const H=e=>(Object(a["t"])("data-v-fc187fb0"),e=e(),Object(a["r"])(),e),L=H(()=>Object(a["f"])("h1",null,"Recorder",-1)),z=H(()=>Object(a["f"])("br",null,null,-1)),G={class:"input-group mb-3"},J=H(()=>Object(a["f"])("span",{class:"input-group-text",id:"basic-addon1"},[Object(a["f"])("i",{class:"fa-solid fa-clapperboard"})],-1)),N=H(()=>Object(a["f"])("option",{value:"1"},"Screen and Camera",-1)),W=H(()=>Object(a["f"])("option",{value:"2"},"Camera Only",-1)),K=[N,W],Q={key:0,class:"select_params"},X=H(()=>Object(a["f"])("label",{class:"form-check-label",for:"flexSwitchCheckDefault"},[Object(a["f"])("i",{class:"fa-solid fa-video"})],-1)),Y=H(()=>Object(a["f"])("option",{value:"off"},"Off",-1)),Z=["value"],ee={class:"select_params"},te=H(()=>Object(a["f"])("label",{class:"form-check-label",for:"flexSwitchCheckDefault"},[Object(a["f"])("i",{class:"fa-solid fa-microphone"})],-1)),se=["change"],ae=H(()=>Object(a["f"])("option",{value:"off"},"Off",-1)),oe=["value"],ce={key:1,class:"select_params"},ne=H(()=>Object(a["f"])("label",{class:"form-check-label",for:"flexSwitchCheckDefault"},[Object(a["f"])("i",{class:"fa-solid fa-desktop"})],-1)),ie=H(()=>Object(a["f"])("br",null,null,-1)),re={key:0},le={id:"webcam",volume:"0",ref:"webcam",width:"1",height:"1",autoplay:""},de={id:"display",ref:"display",width:"1",height:"1",autoplay:""},ue={width:"1280",id:"canvas",height:"720",style:{border:"1px solid #000000"},ref:"canvas"},be={controls:"",id:"previewVideo",ref:"previewVideo",width:"300",height:"200"};function pe(e,t,s,o,c,n){return Object(a["q"])(),Object(a["e"])("div",null,[L,z,Object(a["f"])("div",null,[Object(a["f"])("div",G,[J,Object(a["F"])(Object(a["f"])("select",{"onUpdate:modelValue":t[0]||(t[0]=e=>this.typeOfRecord=e)},K,512),[[a["B"],this.typeOfRecord]]),null==this.mediaRecorder?(Object(a["q"])(),Object(a["e"])("button",{key:0,class:"btn btn-success",onClick:t[1]||(t[1]=Object(a["G"])(e=>n.record(),["prevent"]))}," Start Record ")):Object(a["d"])("",!0),null!=this.mediaRecorder?(Object(a["q"])(),Object(a["e"])("button",{key:1,class:"btn btn-danger",onClick:t[2]||(t[2]=Object(a["G"])(e=>n.stopRecord(),["prevent"]))}," Stop Record ")):Object(a["d"])("",!0)]),Object(a["f"])("form",null,["1"==this.typeOfRecord||"2"==this.typeOfRecord?(Object(a["q"])(),Object(a["e"])("div",Q,[X,Object(a["F"])(Object(a["f"])("select",{id:"select_video","onUpdate:modelValue":t[3]||(t[3]=e=>this.videoChoice=e),onChange:t[4]||(t[4]=e=>n.setVideoParams(e))},[Y,(Object(a["q"])(!0),Object(a["e"])(a["a"],null,Object(a["w"])(this.videoInput,e=>(Object(a["q"])(),Object(a["e"])("option",{key:e,value:e},Object(a["z"])(e.label),9,Z))),128))],544),[[a["B"],this.videoChoice]])])):Object(a["d"])("",!0),Object(a["f"])("div",ee,[te,Object(a["F"])(Object(a["f"])("select",{id:"select_audio","onUpdate:modelValue":t[5]||(t[5]=e=>this.audioChoice=e),change:n.setAudioParams()},[ae,(Object(a["q"])(!0),Object(a["e"])(a["a"],null,Object(a["w"])(this.audioInput,e=>(Object(a["q"])(),Object(a["e"])("option",{key:e,value:e},Object(a["z"])(e.label),9,oe))),128))],8,se),[[a["B"],this.audioChoice]])]),"1"==this.typeOfRecord||"3"==this.typeOfRecord?(Object(a["q"])(),Object(a["e"])("div",ce,[ne,Object(a["f"])("button",{class:"btn btn-dark btn-sm",style:{"margin-left":"10px"},onClick:t[6]||(t[6]=Object(a["G"])(e=>n.getDisplay(),["prevent"]))}," Choisir l'écran ")])):Object(a["d"])("",!0),ie])]),"1"==this.typeOfRecord||"3"==this.typeOfRecord?(Object(a["q"])(),Object(a["e"])("div",re,[Object(a["f"])("div",null,[Object(a["f"])("video",le,null,512),Object(a["f"])("video",de,null,512)]),Object(a["f"])("div",null,[Object(a["f"])("canvas",ue,null,512)]),Object(a["f"])("video",be,null,512)])):Object(a["d"])("",!0)])}s("14d9");var fe={name:"Recorder",data(){return{typeOfRecord:"1",activeWebcam:!1,activeAudio:!1,activeDisplay:!1,mediaRecorder:null,chunks:[],canvas:null,ctx:null,isDrawing:null,webcamStream:"",displayStream:"",audioStream:null,videoInput:[],audioInput:[],audioChoice:"",videoChoice:"",displayInput:[],constraints:{video:!0,audio:!0},displayMediaOptions:{video:{cursor:"always"},audio:!1}}},mounted(){var e=this;e.canvas=e.$refs.canvas,e.ctx=e.canvas.getContext("2d"),e.canvas.addEventListener("load",e.onLoad)},created(){this.main()},methods:{async main(){await this.getUserMedia()},stopRecord(){this.mediaRecorder.stop(),this.mediaRecorder=null},record(){console.log("recording ...");var e=this,t=[],s=e.canvas.captureStream(30);s.addTrack(this.audioStream.getAudioTracks()[0]),console.log(s);const a={mimeType:"video/webm",videoMaximizeFrameRate:!0};e.mediaRecorder=new MediaRecorder(s,a),this.mediaRecorder=e.mediaRecorder,e.mediaRecorder.ondataavailable=function(e){t.push(e.data)},e.mediaRecorder.onstop=function(){var s=new Blob(t,{type:"video/webm"});console.log(s);const a=new File([s],"filename.webm",{type:s.type,lastModified:(new Date).getTime()});console.log(a);var o=new FormData;o.append("myfile",a);try{n.a.post(e.$store.state.gconfig.url_upload_file,o,{headers:{"Content-Type":"multipart/form-data","Access-Control-Allow-Origin":"*"}})}catch(r){console.log(r)}t=[];var c=URL.createObjectURL(s),i=document.getElementById("previewVideo");console.log(i),i.src=c,console.log(c)},e.mediaRecorder.start(),this.onLoad()},onLoad(){var e=this,t=e.$refs.webcam,s=e.$refs.display;setInterval((function(){e.ctx.drawImage(s,0,0,1280,720),e.ctx.drawImage(t,0,0,426,240)}),1)},startWebcam(e){if(console.log(e),1==e)navigator.mediaDevices.getUserMedia(this.constraints).then(e=>{let t=document.getElementById("webcam");t.srcObject=e,this.webcamStream=e});else if(!1===e){let e=document.getElementById("webcam");const t=e.srcObject,s=t.getTracks();s.forEach(e=>{e.stop()}),this.clearCanvas(),this.onLoad(),console.log(this.webcamStream)}},setVideoParams(e){let t=e.target.value;console.log(t),"off"===t?this.startWebcam(!1):(console.log("setVideoParams : "+this.videoChoice.deviceId),this.constraints.video={deviceId:this.videoChoice.deviceId},this.startWebcam(!0))},setAudioParams(){this.constraints.audio={deviceId:this.audioChoice.deviceId},navigator.mediaDevices.getUserMedia({audio:{deviceId:this.audioChoice.deviceId}}).then(e=>{this.audioStream=e})},getUserMedia(){navigator.mediaDevices.getUserMedia(this.constraints).then(e=>{console.log("Streaming now"),e.getTracks().forEach((function(e){e.stop()})),this.getDevices()})},getDisplay(){navigator.mediaDevices.getDisplayMedia(this.displayMediaOptions).then(e=>{let t=document.getElementById("display");t.srcObject=e,this.displayStream=e}),this.onLoad()},getDevices(){navigator.mediaDevices.enumerateDevices().then(e=>{e.forEach(e=>{"audioinput"===e.kind&&this.audioInput.push({deviceId:e.deviceId,kind:e.kind,label:e.label}),"videoinput"===e.kind&&this.videoInput.push({deviceId:e.deviceId,kind:e.kind,label:e.label})})})},clearCanvas(){let e=document.getElementById("webcam");e.src="",e.srcObject=null,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}}};s("0955");const me=k()(fe,[["render",pe],["__scopeId","data-v-fc187fb0"]]);var he=me,Oe=s("0229"),je=s.n(Oe);const ve=e=>(Object(a["t"])("data-v-02b1c78c"),e=e(),Object(a["r"])(),e),ge={class:"container"},_e={class:"row"},ye={id:"signup",class:"col"},we=ve(()=>Object(a["f"])("h1",null,"Sign Up",-1)),ke={class:"input-group mb-3"},Se=ve(()=>Object(a["f"])("span",{class:"input-group-text"},[Object(a["f"])("i",{class:"fa-solid fa-user"})],-1)),Ce={class:"input-group mb-3"},Re=ve(()=>Object(a["f"])("span",{class:"input-group-text"},[Object(a["f"])("i",{class:"fa-solid fa-at"})],-1)),De={class:"input-group mb-3"},xe=ve(()=>Object(a["f"])("span",{class:"input-group-text"},[Object(a["f"])("i",{class:"fa-solid fa-lock"})],-1)),Ie={class:"input-group mb-3"},Me=ve(()=>Object(a["f"])("span",{class:"input-group-text"},[Object(a["f"])("i",{class:"fa-solid fa-lock"})],-1)),qe={key:0,class:"alert alert-danger",role:"alert"},Pe={key:1,class:"d-grid gap-2"},Ee={key:2,class:"d-grid gap-2"},Ve=ve(()=>Object(a["f"])("button",{class:"btn btn-outline-dark",disabled:""},[Object(a["f"])("div",{class:"spinner-border",role:"status"})],-1)),Ue=[Ve],Te={key:3,class:"alert alert-success",role:"alert"},$e={key:4,class:"alert alert-danger",role:"alert"},Ae=ve(()=>Object(a["f"])("div",{class:"col"},[Object(a["f"])("img",{alt:"Vue logo",width:"300",src:je.a})],-1));function Fe(e,t,s,o,c,n){return Object(a["q"])(),Object(a["e"])("div",ge,[Object(a["f"])("div",_e,[Object(a["f"])("div",ye,[we,Object(a["f"])("div",ke,[Se,Object(a["F"])(Object(a["f"])("input",{id:"user_nom",name:"user_nom",type:"text",class:"form-control",placeholder:"Nom","aria-label":"Nom","onUpdate:modelValue":t[0]||(t[0]=e=>this.user_nom=e)},null,512),[[a["C"],this.user_nom]]),Object(a["F"])(Object(a["f"])("input",{id:"user_prenom",name:"user_prenom",type:"text",class:"form-control",placeholder:"Prenom","aria-label":"Prenom","onUpdate:modelValue":t[1]||(t[1]=e=>this.user_prenom=e)},null,512),[[a["C"],this.user_prenom]])]),Object(a["f"])("div",Ce,[Re,Object(a["F"])(Object(a["f"])("input",{id:"user_mail",name:"user_mail",type:"mail",class:"form-control",placeholder:"E-Mail","aria-label":"E-Mail","onUpdate:modelValue":t[2]||(t[2]=e=>this.user_mail=e)},null,512),[[a["C"],this.user_mail]])]),Object(a["f"])("div",De,[xe,Object(a["F"])(Object(a["f"])("input",{id:"user_password1",name:"user_password1",ref:"user_password1",type:"password",class:"form-control",placeholder:"Mot de passe","aria-label":"Mot de passe","onUpdate:modelValue":t[3]||(t[3]=e=>this.user_password1=e)},null,512),[[a["C"],this.user_password1]])]),Object(a["f"])("div",Ie,[Me,Object(a["F"])(Object(a["f"])("input",{id:"user_password2",name:"user_password2",ref:"user_password2",type:"password",class:"form-control",placeholder:"Retapez votre Mot de passe","aria-label":"Retapez votre Mot de passe","onUpdate:modelValue":t[4]||(t[4]=e=>this.user_password2=e),onChange:t[5]||(t[5]=e=>n.verifyPassword())},null,544),[[a["C"],this.user_password2]])]),0==c.validPassword?(Object(a["q"])(),Object(a["e"])("div",qe," Les mots de passe ne correspondents pas ")):Object(a["d"])("",!0),0==c.submitClick?(Object(a["q"])(),Object(a["e"])("div",Pe,[Object(a["f"])("button",{ref:"submitButton",class:"btn btn-outline-dark",onClick:t[6]||(t[6]=Object(a["G"])(e=>n.submit(),["prevent"])),disabled:""}," S'inscrire ",512)])):Object(a["d"])("",!0),1==c.submitClick?(Object(a["q"])(),Object(a["e"])("div",Ee,Ue)):Object(a["d"])("",!0),200===this.serverResponse.status?(Object(a["q"])(),Object(a["e"])("div",Te,Object(a["z"])(this.serverResponse.msg),1)):Object(a["d"])("",!0),200!=this.serverResponse.status&&null!=this.serverResponse.status?(Object(a["q"])(),Object(a["e"])("div",$e,Object(a["z"])(this.serverResponse.msg),1)):Object(a["d"])("",!0)]),Ae])])}var Be={name:"Signup",data(){return{user_nom:null,user_prenom:null,user_mail:null,user_password1:null,user_password2:null,validPassword:null,submitClick:!1,serverResponse:{status:null,msg:null}}},methods:{verifyPassword(){this.user_password1==this.user_password2?(this.validPassword=!0,this.$refs.submitButton.disabled=!1):this.validPassword=!1},submit(){console.log("Submit form"),this.submitClick=!0;const e={user_nom:this.user_nom,user_prenom:this.user_prenom,user_mail:this.user_mail,user_password:this.user_password2};console.log(this.$store.state.gconfig);try{n.a.post(this.$store.state.gconfig.url_signup,e,{headers:{"Content-Type":"application/json"}}).then(e=>{console.log(e),this.serverResponse=e.data,this.submitClick=!1})}catch(t){console.log(t)}}}};s("ba66");const He=k()(Be,[["render",Fe],["__scopeId","data-v-02b1c78c"]]);var Le=He;const ze={class:"container"},Ge={class:"row"},Je=Object(a["f"])("div",{class:"col"},[Object(a["f"])("img",{alt:"Vue logo",width:"300",src:je.a})],-1),Ne={id:"signup",class:"col"},We=Object(a["f"])("h1",null,"Sign In",-1),Ke={class:"input-group mb-3"},Qe=Object(a["f"])("span",{class:"input-group-text"},[Object(a["f"])("i",{class:"fa-solid fa-at"})],-1),Xe={class:"input-group mb-3"},Ye=Object(a["f"])("span",{class:"input-group-text"},[Object(a["f"])("i",{class:"fa-solid fa-lock"})],-1),Ze={key:0,class:"d-grid gap-2"};function et(e,t,s,o,c,n){return Object(a["q"])(),Object(a["e"])("div",ze,[Object(a["f"])("div",Ge,[Je,Object(a["f"])("div",Ne,[We,Object(a["f"])("form",null,[Object(a["f"])("div",Ke,[Qe,Object(a["F"])(Object(a["f"])("input",{id:"user_mail",name:"user_mail",type:"mail",class:"form-control",placeholder:"E-Mail","aria-label":"E-Mail","onUpdate:modelValue":t[0]||(t[0]=e=>this.user_mail=e)},null,512),[[a["C"],this.user_mail]])]),Object(a["f"])("div",Xe,[Ye,Object(a["F"])(Object(a["f"])("input",{id:"user_password1",name:"user_password1",ref:"user_password1",type:"password",class:"form-control",placeholder:"Mot de passe","aria-label":"Mot de passe","onUpdate:modelValue":t[1]||(t[1]=e=>this.user_password=e)},null,512),[[a["C"],this.user_password]])]),0==c.submitClick?(Object(a["q"])(),Object(a["e"])("div",Ze,[Object(a["f"])("button",{ref:"submitButton",class:"btn btn-outline-dark",onClick:t[2]||(t[2]=Object(a["G"])(e=>n.submit(),["prevent"]))}," Se connecter ",512)])):Object(a["d"])("",!0)])])])])}var tt={name:"Signin",data(){return{user_mail:null,user_password:null,submitClick:!1}},methods:{addHours(e,t=new Date){return t.setTime(t.getTime()+60*e*60*1e3),t},submit(){console.log("submit");const e={user_mail:this.user_mail,user_password:this.user_password};try{n.a.post(this.$store.state.gconfig.url_signin,e,{headers:{"Content-Type":"application/json"}}).then(e=>{if(this.serverResponse=e.data,this.submitClick=!1,200===e.data.status){this.$store.state.userData=e.data.user_data;let t=this.addHours(2);sessionStorage.setItem("userData",JSON.stringify({user_data:e.data.user_data,timeout:t})),this.$router.push("/Account")}})}catch(t){console.log(t)}}}};const st=k()(tt,[["render",et]]);var at=st;const ot={class:"container"},ct=Object(a["f"])("h1",null,"Account",-1),nt=[ct];function it(e,t,s,o,c,n){return Object(a["q"])(),Object(a["e"])("div",ot,nt)}var rt={name:"Account"};const lt=k()(rt,[["render",it]]);var dt=lt;function ut(e,t,s,o,c,n){return Object(a["q"])(),Object(a["e"])("h1",null,"Home")}var bt={name:"Home",data(){return{data:""}},computed:{},methods:{}};const pt=k()(bt,[["render",ut]]);var ft=pt;const mt=[{name:"Home",path:"/",component:B,meta:{title:"Home"}},{name:"Recorder",path:"/Recorder",component:he,meta:{title:"Recorder"}},{name:"Account",path:"/Account",component:dt,meta:{title:"Account"}},{name:"Signup",path:"/Signup",component:Le,meta:{title:"Signup"}},{name:"Signin",path:"/Signin",component:at,meta:{title:"Signin"}},{name:"ErrorPage",path:"/ErrorPage",component:ft,meta:{title:"Error Page"}}],ht=Object(E["a"])({history:Object(E["b"])(),routes:mt});ht.afterEach(e=>{document.title=e.meta.title});var Ot=ht,jt=(s("15f5"),s("7051"),s("f5af")),vt=s.n(jt);s("e829");const gt=Object(a["c"])(x);gt.use(Ot),gt.use(P),gt.use(vt.a.init()),gt.mount("#app")},ba66:function(e,t,s){"use strict";s("c1e4")},be6f:function(e){e.exports=JSON.parse('{"_url_signup":"http://localhost:3000/signup","_url_signin":"http://localhost:3000/signin","_url_upload_file":"http://localhost:3000/upload_file","__url_signup":"http://212.227.71.186:3000/signup","__url_signin":"http://212.227.71.186:3000/signin","__url_upload_file":"http://212.227.71.186:3000/upload_file","url_signup":"https://demasoft.studyneo.com:3000/signup","url_signin":"https://demasoft.studyneo.com:3000/signin","url_upload_file":"https://demasoft.studyneo.com:3000/upload_file"}')},c1e4:function(e,t,s){},c91d:function(e,t,s){},cd18:function(e,t,s){"use strict";s("43fb")},f33e:function(e,t,s){}});
//# sourceMappingURL=app.975f68d8.js.map