
import Vue from 'vue';
import Vuex from 'vuex';
import Tone from 'tone';

Vue.use(Vuex);




const store = new Vuex.Store({

    state: {
        playState: 0,
        
        sounds: [{type: "elephant",
                  src: "./src/assets/elephant.mp3",
                  isPlaying: 0},
              {   type: "chicken",
                  src: "./src/assets/chicken.mp3",
                  isPlaying: 0},
               {  type: "dog",
                  src: "./src/assets/dog.mp3",
                  isPlaying: 0},
               {  type: "synth",
                  src: "./src/assets/synth2.mp3",
                  isPlaying: 0},
               {  type: "drums",
                  src: "./src/assets/drums.mp3",
                  isPlaying: 0},
               {  type: "noise",
                  src: "./src/assets/noise.mp3",
                  isPlaying: 0},]
    
    },
   
  
      
  
    actions: {
      stop(){
        console.log("stoped");
        Tone.Transport.cancel()
      
        
        
      },
      play(){
        Tone.Transport.bpm.value = 47.5;
        Tone.Transport.scheduleRepeat(repeat.bind(this), '1n');     
        Tone.Transport.start();

        function repeat(){

         let playingSounds = this.state.sounds.filter(sound => sound.isPlaying);
      
       
        playingSounds.forEach(element => {
            let sound = new Tone.Sampler({
                   "C3": element.src},
                   ()=> { 
                     sound.triggerAttack("C3")

                   }).toMaster();
          
        });
      
     
        
        console.log("playing");
        console.log(playingSounds.length);
       
      }
      },
      togglePlayState() {
        this.state.playState= 1-this.state.playState
      },
      toggleAnimal(context,animal){
        let animalToggle = this.state.sounds.filter(item => item.type == animal);
        console.log("anime",animalToggle);
         animalToggle[0].isPlaying = 1- animalToggle[0].isPlaying
        console.log("togglar på", this.state.sounds.filter(item => item.isPlaying == 1));
        
      }
    }
});

import { mapState,  mapMutations, mapActions} from 'vuex';

new Vue({ 
    el: '#app',
    store,
    data: {   
    },
    computed: mapState([ 'playState' ]),
   
   
    methods: {
        stop () {
            this.$store.dispatch('stop');
            this.$store.dispatch('togglePlayState');
   
        },
        play() {
            this.$store.dispatch("play");
            this.$store.dispatch('togglePlayState');
        },
      
        toggleAnimal(animal){
         let animalType = animal;
          this.$store.dispatch("toggleAnimal", animalType);
        }
       
       
    }
});


      