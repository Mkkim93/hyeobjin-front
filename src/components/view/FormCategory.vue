<template>
    <nav class="category-nav-main justify-center">
        <ul>
            <li v-for="(category, index) in categories" :key="index">
                <router-link :to="category.path">
                    <button class="category-btn" :class="{ active: selectedCategory === category.name }"
                        @click="selectCategory(category.name)">
                        {{ category.name }}
                    </button>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "FormCategory",

    props: {
        categoryStep: Number
    },

    data() {
        return {
            selectedCategory: "회사소개",

            cate01: [
                { path: "/about", name: "인사말" },
                { path: "/location", name: "오시는 길" }
            ],

            cate02: [], // API에서 동적으로 채울 데이터

            cate03: [
                { path: "/notice", name: "공지사항" }
            ],

            cate04: [
                { path: "/inquiry", name: "1:1문의" },
                { path: "/help", name: "A/S문의" },
                { path: "/faq", name: "FAQ" }
            ]
        };
    },

    created() {
        this.fetchManufacturers(); // API 호출
    },

    computed: {
        categories() {
            if (this.categoryStep === 1) return this.cate01;
            if (this.categoryStep === 2) return this.cate02; // cate02에 API 데이터 적용
            if (this.categoryStep === 3) return this.cate03;
            if (this.categoryStep === 4) return this.cate04;
            return [];
        }
    },

    methods: {
        async fetchManufacturers() {
            try {
                const response = await this.$axios.get("/manufacturers"); // API 호출
                this.cate02 = response.data
                    .filter(manu => manu.manuYN === "Y") // manuYN === "Y" 인 항목만 필터링
                    .map(manu => ({
                        path: `/manu/${manu.manuId}`, // path 설정
                        name: manu.manuName
                    }));
            } catch (error) {
                console.error("Failed to fetch manufacturers:", error);
            }
        },

        selectCategory(category) {
            this.selectedCategory = category;
        }
    }
};
</script>

<style scoped>
.category-nav-main {
    max-width: 1200px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    position: relative;
    z-index: 1000;
    margin: 0 auto 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.category-nav-main ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
}

.category-nav-main .category-btn {
    padding: 12px 20px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    background-color: white;
    color: black;
    transition: all 0.3s ease-in-out;
    flex: 1 1 auto;
    text-align: center;
    white-space: nowrap;
}

.category-nav-main .category-btn.active {
    background-color: #555;
    color: white;
}

.category-nav-main .category-btn:hover {
    background-color: #ddd;
}

@media (max-width: 768px) {
    .category-nav-main {
        flex-direction: column;
        padding: 10px 0;
    }

    .category-nav-main ul {
        flex-direction: column;
        align-items: center;
    }

    .category-nav-main .category-btn {
        width: 100%;
        text-align: center;
    }
}
</style>