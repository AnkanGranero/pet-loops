
import Vue from 'vue';
import Vuex from 'vuex';
import Tone from 'tone';

Vue.use(Vuex);

let src = "./src/assets/"



const store = new Vuex.Store({

    state: {
        playState: 0,
        firstPlay: false,
        
        sounds: [{type: "elephant",
                  src: [src+"elephant1.mp3",src+"elephant2.mp3",src+"elephant3.mp3",src+"elephant4.mp3",],
                  isPlaying: -1},
              {   type: "chicken",
                  src: [src+"chicken1.mp3",src+"chicken2.mp3",src+"chicken3.mp3",src+"chicken4.mp3",],
                  isPlaying: -1},
               {  type: "dog",
                  src: [src+"dog1.mp3",src+"dog2.mp3",src+"dog3.mp3",src+"dog4.mp3",],
                  isPlaying: -1},
               {  type: "synth",
                  src: [src+"synth1.mp3",src+"synth2.mp3",src+"synth3.mp3",src+"synth4.mp3",],
                  isPlaying: -1},
               {  type: "drums",
                  src: [src+"drums1.mp3",src+"drums2.mp3",src+"drums3.mp3",src+"drums4.mp3"],
                  isPlaying: -1},
               {  type: "whale",
                  src: [src+"whale1.mp3",src+"whale2.mp3",src+"whale3.mp3",src+"whale4.mp3",],
                  isPlaying: -1},]
    
    },
   
   mutations: {
    changePlayState(state, val) {
             
             
              state.playState += val
    }
   },
      
  
    actions: {
      stop(){
        console.log("stoped");
        Tone.Transport.cancel()
      
        
        
      },
      play(){
        this.state.firstPlay= true;
        Tone.Transport.bpm.value = 95;
        Tone.Transport.scheduleRepeat(repeat.bind(this), '2n');     
        Tone.Transport.start();
        let index = 0;

        function repeat(){
         
         let playingSounds = this.state.sounds.filter(sound => sound.isPlaying == 1);
      
       
        playingSounds.forEach(element => {
            let sound = new Tone.Sampler({
                    "C3": element.src[index]},
                   
                   ()=> { 
                     sound.triggerAttack("C3")

                   }).toMaster();
          
        });
        index++
        if(index >3){
          index = 0
        }
      
     
        
        console.log("playing");
        console.log("index",index);
       
      }
      },
     
      toggleAnimal(context,animal, dispatch){

        let playState = this.state.playState
        let animalReadyToPlay = this.state.sounds.filter(item => item.type == animal);

        console.log("animalready",animalReadyToPlay[0].isPlaying);
         
         console.log("playState",this.state.playState)
        
        if(playState == 0 && animalReadyToPlay[0].isPlaying == -1 ) { context.dispatch("play");
        console.log("nu spelar vi",playState)
        };
        if(playState == 1 && animalReadyToPlay[0].isPlaying ==  1 ) { context.dispatch("stop")
         console.log("nu stoppar vi")};

         animalReadyToPlay[0].isPlaying =  -1 * animalReadyToPlay[0].isPlaying; 
         
         context.commit("changePlayState",animalReadyToPlay[0].isPlaying);
         
         

         

        console.log("togglar på", this.state.sounds.filter(item => item.isPlaying == 1));
        
      }
    }
});


Vue.component("my-menu",{
  template:  `<div><ul>
      <li id="drums" @click="$emit('drums')" class="one">
        <a href="#">
          <span v-bind:class=" {spin: sharedState.playState}" class="icon"></span>
        </a>
      </li>
      <li id="chicken" @click="$emit('chicken')" class="two">
        <a href="#">
          <span class="icon"
          v-bind:class=" {spin: sharedState.playState}"></span>
        </a>
      </li>
      <li id="dog" @click="$emit('dog')" class="three">
        <a href="#">
          <span  class="icon"
          v-bind:class=" {spin: sharedState.playState}"></span>
        </a>
      </li>
      <li id="synth" @click="$emit('synth')" class="four">
        <a href="#">
          <span class="icon"
          v-bind:class=" {spin: sharedState.playState}"></span>
        </a>
      </li>
      <li id="elephant" @click="$emit('elephant')" class="five">
        <a href="#">
          <span class="icon"
          v-bind:class=" {spin: sharedState.playState}"></span>
        </a>
      </li>
      <li id="whale" @click="$emit('whale')" class="six">
        <a href="#">
          <span class="icon"
          v-bind:class=" {spin: sharedState.playState}"></span>
        </a>
      </li>
    </ul>
    
    <svg height="0" width="0">
      <defs>
        <clipPath clipPathUnits="objectBoundingBox" id="sector">
          <path fill="none" stroke="#111" stroke-width="1" class="sector" d="M0.5,0.5 l0.5,0 A0.5,0.5 0 0,0 0.75,.066987298 z"></path>
        </clipPath>
      </defs>
    </svg>
    </div>`,
    data() { return {
      privateState: {},
      sharedState: store.state
    }}
})

import { mapState,  mapMutations, mapActions} from 'vuex';



new Vue({ 
    el: '#app',
    store,
    data: {   
    },
    computed: mapState([ 'playState' ]),
    
   
   
    methods: {
        /* stop () {
            this.$store.dispatch('stop');
            this.$store.dispatch('togglePlayState');
   
        },
        play() {
            this.$store.dispatch("play");
            this.$store.dispatch('togglePlayState');
        }, */
      
        toggleAnimal(animal){
        
          this.$store.dispatch("toggleAnimal", animal );
        }
       
       
    }
});


      