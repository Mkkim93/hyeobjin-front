<template>
    <div>
        <!-- 네비게이션바 -->
        <nav class="category">
            <ul>
                <li
                    v-for="(category, index) in categories"
                    :key="index"
                    :class="{'active': activeCategory === category}"
                    @click="selectCategory(category)"
                >
                    {{ category }}
                </li>
            </ul>
        </nav>

        <!-- 선택된 카테고리 표시 -->
        <div class="category-content">
            <h3>선택된 카테고리: {{ activeCategory }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Kcc',
    data() {
        return {
            categories: ['도어', '창문', '창호', '핸들', '기타'], // 중분류 카테고리 목록
            activeCategory: '', // 선택된 카테고리
        }
    },
    methods: {
        // 카테고리 선택 메서드
        selectCategory(category) {
            this.activeCategory = category;
        }
    }
}
</script>

<style scoped>
/* 네비게이션 스타일 */
.category {
    font-size: 1.2rem;
    margin-bottom: 20px;
}

.category ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;
}

.category li {
    cursor: pointer;
    padding: 10px 20px;
    background-color: #f0f0f0;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.category li.active {
    background-color: #0078ff;
    color: white;
}

.category li:hover {
    background-color: #0078ff;
    color: white;
}

/* 선택된 카테고리 내용 스타일 */
.category-content {
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: bold;
}
</style>
