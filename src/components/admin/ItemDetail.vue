<template>

  <p>제품 상세 페이지 입니다.</p>

  <button class="btn-modify-ready" @click="modifyItems()">수정</button>

  <div v-if="ItemDetailData">
    <div class="container">

      <div class="image-container" v-for="(files, count) in fileBoxesData" :key="files">
        <div v-if="fileBoxesData[count].isMain">
          <img :src="`/item/${fileBoxesData[count].fileName}`" alt="제품 이미지" />
        </div>
      </div>
      <div class="info-container">
        <h1>{{ ItemDetailData.itemName }}</h1>
        <p>{{ ItemDetailData.itemDescription }}</p>
        <table>
          <tbody>
            
            <tr>
              <th>제조사</th>
              <td>{{ ItemDetailData.manuName }}</td>
            </tr>

            <tr>
              <th>용도</th>
              <td>{{ ItemDetailData.itemUse }}</td>
            </tr>

            <tr>
              <th>내부 색상</th>
              <td>{{ ItemDetailData.itemInColor }}</td>
            </tr>

            <tr>
              <th>외부 색상</th>
              <td>{{ ItemDetailData.itemOutColor }}</td>
            </tr>

            <tr>
              <th>유리사용두께</th>
              <td>{{ ItemDetailData.itemSpec }}</td>
            </tr>

            <tr>
              <th>창틀 폭</th>
              <td>{{ ItemDetailData.itemFrameWidth }}</td>
            </tr>

          </tbody>
        </table>
      </div>

      <div class="image-container" v-for="(files, count) in fileBoxesData" :key="files">
        <div v-if="!fileBoxesData[count].isMain">
          <img :src="`/item/${fileBoxesData[count].fileName}`" alt="제품 이미지" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetail',
  data() {
    return {
      DetailItemId: null,
      DetailManuId: null,
      ItemDetailData: {},

      fileBoxesData: [],
    };
  },

  created() {
    console.log('ItemEdit 컴포넌트가 실행되었습니다.');
    this.DetailItemId = Number(this.$route.params.itemId);
    this.DetailManuId = Number(this.$route.params.manuId);
    this.fetchItemDetailData(this.DetailManuId, this.DetailItemId);
  },

  mounted() {

  },

  methods: {
    async fetchItemDetailData(manuId, itemId) {

      try {
        const response = await this.$axios.get(`/admin/items/detail?manuId=${manuId}&itemId=${itemId}`);
        this.ItemDetailData = response.data;
        this.fileBoxesData = response.data.fileBoxes;
        console.log('response.content', response);

      } catch (error) {
        console.log('fetch Data Detail failed', error);
      }

    },

    async modifyItems() {
      this.$router.push({
        path: `/item/edit/${this.DetailItemId}`,
      });

    },
  },
};
</script>

<style scoped></style>