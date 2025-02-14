<template>
    <nav class="category-nav-main justify-center">
        <ul>
            <li v-for="(category, index) in categories" :key="index">
                <button class="category-btn" :class="{ active: selectedCategory === category }"
                    @click="selectCategory(category)">
                    {{ category }}
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'FormCategory',
    data() {
        return {
            categories: ["온라인상담", "공지사항", "견적&실측문의", "고객상담실", "A/S 문의"],
            selectedCategory: "온라인상담",
        }
    },

    created() {

    },

    props: {
        categories
    },

    methods: {
        async selectCategory(category) {
            this.selectedCategory = category;
            // console.log(`선택된 카테고리: ${category}`);
        },
    }
}
</script>

<style scoped>
/***** 🔹 상위 카테고리 네비게이션 바 (메인) *****/
.category-nav-main {
    max-width: 1200px;
    /* ✅ 화면을 벗어나지 않도록 최대 너비 설정 */
    width: 100%;
    /* ✅ 작은 화면에서도 가득 차도록 설정 */
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    position: relative;
    /* ✅ 다른 요소들과 겹치지 않도록 설정 */
    z-index: 1000;
    /* ✅ 다른 요소 위에 배치 */
    margin: 0 auto 20px;
    /* ✅ 중앙 정렬 및 아래 여백 추가 */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* ✅ 카테고리 목록 스타일 */
.category-nav-main ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    /* ✅ 버튼이 많을 경우 자동으로 줄바꿈 */
}

/* ✅ 개별 버튼 스타일 */
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
    /* ✅ 버튼 크기가 자동으로 조정되도록 설정 */
    text-align: center;
    white-space: nowrap;
    /* ✅ 버튼 내부 텍스트가 줄바꿈되지 않도록 설정 */
}

/* ✅ 활성화된 탭 스타일 */
.category-nav-main .category-btn.active {
    background-color: #555;
    color: white;
}

/* ✅ 호버 효과 */
.category-nav-main .category-btn:hover {
    background-color: #ddd;
}

/***** 🔹 반응형 디자인 *****/
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
        /* ✅ 모바일에서는 버튼이 전체 너비를 차지 */
        text-align: center;
    }
}
</style>