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
    <div class = "bg-indigo-700 rounded-lg shadow-lg p-2 flex hover:bg-indigo-600 transition-colors">
        <Icon :icon="props.icons" :class = "['h-10 w-15 m-4 rounded-md text-white p-1', iconClass]"/>
        <div class = 'flex flex-col'>
            <h1 class = "text-white text-xl mt-3 ">{{ props.title }}</h1>
            <h1 class = "text-gray-300 text-md" >{{ props.content }}</h1>
        </div>
    </div>

</template>