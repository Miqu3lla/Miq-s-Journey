<script setup>
    import {Icon} from '@iconify/vue'

    const props = defineProps({
        icons: {type: String},
        title: {type: String},
        content: {type: String},
        iconClass : {type: String}
    })
</script>

<template>
    <div class = "bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-xl p-2 flex hover:bg-slate-700/80 transition-all border border-indigo-500/20 hover:border-indigo-400/40">
        <Icon :icon="props.icons" :class = "['h-10 w-15 m-4 rounded-md text-white p-1', iconClass]"/>
        <div class = 'flex flex-col'>
            <h1 class = "text-white text-xl mt-3 ">{{ props.title }}</h1>
            <h1 class = "text-gray-300 text-md" >{{ props.content }}</h1>
        </div>
    </div>

</template>