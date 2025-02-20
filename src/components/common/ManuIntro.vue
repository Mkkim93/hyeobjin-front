<template>
    <div v-if="currentStep == 1">
        <div class="product-section">
            <img :src="logoKCC" alt="kcc_logo">
            <div class="product-text">
                
                <h2 class="product-title">{{ KCCItems.itemName }}</h2>
                <p class="product-description">{{ KCCItems.itemDescription }}</p>
            </div>
        </div>
        <div class="product-images">
            <img v-for="(image, index) in KCCImage" :key="index" :src="image" class="product-image" alt="error" />
        </div>
    </div>
    
    <div v-if="currentStep == 2">
        <div class="product-section">
            <img :src="logoHugreen" alt="hu_logo">
            <div class="product-text">
                <h2 class="product-title">{{ HugreenItems.itemName }}</h2>
                <p class="product-description">{{ HugreenItems.itemDescription }}</p>
            </div>
        </div>
        <div class="product-images">
            <img v-for="(image, index) in HugreenImage" :key="index" :src="image" class="product-image" alt="error" />
        </div>
    </div>

    <div v-if="currentStep == 3">
        <div class="product-section">
            <img :src="logoYerim" alt="ye_logo">
            <div class="product-text">
                <h2 class="product-title">{{ YerimItems.itemName }}</h2>
                <p class="product-description">{{ YerimItems.itemDescription }}</p>
            </div>
        </div>
        <div class="product-images">
            <img v-for="(image, index) in YerimImage" :key="index" :src="image" class="product-image" alt="error" />
        </div>
    </div>
</template>

<script>
import infoImg01 from '@/assets/images/info_img01.jpg';
import infoImg02 from '@/assets/images/info_img02.jpg';
import infoImg03 from '@/assets/images/info_img03.jpg';

import infoImg04 from '@/assets/images/info_img04.jpg';
import infoImg05 from '@/assets/images/info_img05.jpg';
import infoImg06 from '@/assets/images/info_img06.jpg';

import infoImg07 from '@/assets/images/info_img07.png';
import infoImg08 from '@/assets/images/info_img08.png';
import infoImg09 from '@/assets/images/info_img09.png';

import logoKCC from '@/assets/images/logo_kg01.png';
import logoHugreen from '@/assets/images/logo_hugreen3.png';
import logoYerim from '@/assets/images/logo_yerim.png';


export default {
    name: "Manufact",
    props: { step: Number },
    data() {
        return {

            logoKCC,
            logoHugreen,
            logoYerim,
            currentStep: this.step,

            KCCItems: {
                itemName: "KCC 일반 창호",
                itemDescription:
                    "용도별로 다양한 종류를 갖춘 KCC 일반창호는 우수한 단열성능과 미려한 외관을 갖춘 고품질의 창호입니다.",
            },

            KCCImage: [
                infoImg01,
                infoImg02,
                infoImg03,
            ],

            HugreenItems: {
                itemName: "휴그린 이중창",
                itemDescription:
                    "실내 공간의 초미세먼지, 유해 물질 등을 감지하는 인공지능 스마트센서로 실내 공기를 종합적으로 분석하여 자동으로 청정한 환경을 만들어줍니다.",
            },

            HugreenImage: [
                infoImg04,
                infoImg05,
                infoImg06,
            ],

            YerimItems: {
                itemName: "예림 창호",
                itemDescription:
                    "예림 창호는 완벽한 구조설계로 뛰어난 기밀성을 확보하여 외부의 영향을 최소화합니다. 다양한 두께의 유리적용과 우수한 열관류율로 에너지 손실을 줄이고 환경표지인증을 획득한 친환경 무납원료로 이상적인 주거환경을 제시합니다.우리집을 안전하게 지켜주는 예림 창호를 만나보세요.",
            },

            YerimImage: [
                infoImg07,
                infoImg08,
                infoImg09,
            ],

        };
    },

    watch: { step(newVal) { this.currentStep = newVal; } },
};
</script>
<style scoped>
.product-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-text {
    flex: 1;
    padding: 20px;
}

.product-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
}

.product-description {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
}

.product-features h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.product-features ul {
    list-style: none;
    padding: 0;
}

.product-features li {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 8px;
}

.feature-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.product-images {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.product-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .product-section {
        flex-direction: column;
        text-align: center;
    }

    .product-images {
        flex-direction: column;
    }

    .product-image {
        max-width: 100%;
    }
}
</style>