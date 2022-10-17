import {ref } from 'vue';
export default {
    props: {
        'contentL': String,
        'contentR':String,
        function1: {
            type:Function
        },
        function2: {
            type:Function
        },
        'btnRef': String,
        'btnRefL': String,
        'btnRefR': String,
    },
    methods: {
        onClick1: function(){
           if(this.function1){
            this.function1();
           }
            this.$refs.btnRef.classList.add("left-0");
            this.$refs.btnRef.classList.remove("left-110");
            this.$refs.btnRefL.classList.add("active-btn");
            this.$refs.btnRefR.classList.remove("active-btn");
        },
        onClick2: function(){
            if(this.function2){
                this.function2();
            }
            this.$refs.btnRef.classList.add("left-110");
            this.$refs.btnRef.classList.remove("left-0");
            this.$refs.btnRefR.classList.add("active-btn");
            this.$refs.btnRefL.classList.remove("active-btn");
        }
    }
}
