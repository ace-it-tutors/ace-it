import { Component, AfterViewInit } from '@angular/core';
declare var SimpleWebRTC: any;

@Component({
  selector: 'video-chat',
  template: require('./videoChat.template.html')
})
export class VideoChatComponent implements AfterViewInit {
ngAfterViewInit() {
  var webrtc = new SimpleWebRTC({
  // the id/element dom element that will hold "our" video
  localVideoEl: 'localVideo',
  // the id/element dom element that will hold remote videos
  remoteVideosEl: 'remotesVideos',
  // immediately ask for camera access
  autoRequestMedia: true
});

webrtc.on('readyToCall', function () {
  // you can name it anything
  webrtc.joinRoom('your awesome room name');
});
  console.log('Video Chat Component')
}
};
