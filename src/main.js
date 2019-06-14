
import Vue from 'vue';
import Vuex from 'vuex';
import Tone from 'tone';

Vue.use(Vuex);

let sounds = "./src/assets/sounds/";
let pictures = "./src/assets/pictures/";



const store = new Vuex.Store({

  state: {
    playState: 0,
    firstPlay: false,

    sounds: [{
      type: "elephant",
      src: [sounds + "elephant1.mp3", sounds + "elephant2.mp3", sounds + "elephant3.mp3", sounds + "elephant4.mp3",],
      isPlaying: -1,
      id: "one",
      img: [`${pictures}elephant.gif`,`${pictures}elephantActive.gif`]
    },
    {
      type: "chicken",
      src: [sounds + "chicken1.mp3", sounds + "chicken2.mp3", sounds + "chicken3.mp3", sounds + "chicken4.mp3",],
      isPlaying: -1,
      id: "two",
      img: [`${pictures}chicken.gif`,`${pictures}chickenActive.gif`]
    },
    {
      type: "dog",
      src: [sounds + "dog1.mp3", sounds + "dog2.mp3", sounds + "dog3.mp3", sounds + "dog4.mp3",],
      isPlaying: -1,
      id: "three",
      img: [`${pictures}dog.gif`,`${pictures}dogActive.gif`]
    },
    {
      type: "synth",
      src: [sounds + "synth1.mp3", sounds + "synth2.mp3", sounds + "synth3.mp3", sounds + "synth4.mp3",],
      isPlaying: -1,
      id: "four",
      img: [`${pictures}synth.gif`,`${pictures}synthActive.gif`]
    },
    {
      type: "drums",
      src: [sounds + "drums1.mp3", sounds + "drums2.mp3", sounds + "drums3.mp3", sounds + "drums4.mp3"],
      isPlaying: -1,
      id: "five",
      img: [`${pictures}drums.gif`,`${pictures}drumsActive.gif`]
    },
    {
      type: "whale",
      src: [sounds + "whale1.mp3", sounds + "whale2.mp3", sounds + "whale3.mp3", sounds + "whale4.mp3", sounds + "whale5.mp3", sounds + "whale6.mp3", sounds + "whale7.mp3", sounds + "whale8.mp3",],
      isPlaying: -1,
      id: "six",
      img: [`${pictures}whale.gif`,`${pictures}whaleActive.gif`]
    },]

  },

  mutations: {
    changePlayState(state, val) {


      state.playState += val
    }
  },


  actions: {
    stop() {
      Tone.Transport.cancel()



    },
    play() {
      this.state.firstPlay = true;
      Tone.Transport.bpm.value = 95;
      Tone.Transport.scheduleRepeat(repeat.bind(this), '2n');
      Tone.Transport.start();
      let repeatIndex = 0;

      function repeat() {

        let playingSounds = this.state.sounds.filter(sound => sound.isPlaying == 1);


        playingSounds.forEach(element => {
          let soundIndex = repeatIndex;
          if (!element.src[soundIndex]) {
            soundIndex = repeatIndex - 4
          }
          let sound = new Tone.Sampler({
            "C3": element.src[soundIndex]
          },

            () => {
              sound.triggerAttack("C3")

            }).toMaster();

        });
        repeatIndex++
        if (repeatIndex > 7) {
          repeatIndex = 0
        }





      }
    },

    animalClicked(context, animal, dispatch) {

      let playState = this.state.playState
      let animalReadyToPlay = this.state.sounds.filter(item => item.type == animal);

      if (playState == 0 && animalReadyToPlay[0].isPlaying == -1) {
        context.dispatch("play");
        console.log("nu spelar vi", playState)
      };
      if (playState == 1 && animalReadyToPlay[0].isPlaying == 1) {
        context.dispatch("stop")
        console.log("nu stoppar vi")
      };

      animalReadyToPlay[0].isPlaying = -1 * animalReadyToPlay[0].isPlaying;

      context.commit("changePlayState", animalReadyToPlay[0].isPlaying);


    }
  }
});


Vue.component("my-menu", {
  template: `<div><ul>
  
    <li v-for="item in sounds" v-bind:id="item.type" :class="item.id" v-on:click="$emit(item.type)"> <a href="#">
        <span v-bind:class="{spin: sharedState.playState}" class="icon">
        <img v-if="item.isPlaying==1" :src=item.img[1]>
        <img v-else :src=item.img[0]></span>
      </a></li> 

  </ul>
  <svg height="0" width="0">
      <defs>
        <clipPath clipPathUnits="objectBoundingBox" id="sector">
          <path fill="none" stroke="#111" stroke-width="1" class="sector" d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
        </clipPath>
      </defs>
    </svg></div>`,
  data() {
    return {
      privateState: {},
      sharedState: store.state,
      sounds: store.state.sounds

    }
  }
})

import { mapState } from 'vuex';



new Vue({
  el: '#app',
  store,
  data: {
  },
  computed: mapState(['playState']),



  methods: {


    animalClicked(animal) {

      this.$store.dispatch("animalClicked", animal);
    }


  }
});


