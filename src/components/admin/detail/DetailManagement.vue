<template>
    <p>제품 사양 및 타입을 관리하는 페이지 입니다.</p>
    <button @click="openChangEvent(1)">유리 사양 관리</button>
    <button @click="openChangEvent(2)">제품 타입 관리</button>
    <div v-if="step === 1">
        <Glass />
    </div>

    <div v-if="step === 2">
        <Type />
    </div>

</template>

<script>
import Glass from './Glass.vue';
import Type from './Type.vue';

export default {
    name: 'DetailManagement',
    data() {
        return {
            step: 0,
        }
    },

    components: {
        Glass, 
        Type
    },

    methods: {
        openChangEvent(newStep) {
            this.step = newStep;
        }
    }
}
</script>