<template>
  <section class="container bg-light p-5 rounded shadow-lg">
    <h1 class="text-center fw-bold text-dark mb-4">제품 상세 페이지</h1>

    <div class="row">
      <div class="col-md-7">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="itemName" class="form-label">제품명</label>
            <input id="itemName" v-model="ItemDetailData.itemName" class="form-control" readonly />
          </div>

          <div class="col-md-6 mb-3">
            <label for="manuName" class="form-label">제조사</label>
            <input id="manuName" v-model="ItemDetailData.manuName" class="form-control" readonly />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="itemNum" class="form-label">품번</label>
            <input id="itemNum" v-model="ItemDetailData.itemNum" class="form-control" readonly />
          </div>

          <div class="col-md-6 mb-3">
            <label for="itemType" class="form-label">제품 타입</label>
            <input id="itemType" v-model="ItemDetailData.itemType" class="form-control" readonly />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="itemUse" class="form-label">제품 용도</label>
            <input id="itemUse" v-model="ItemDetailData.itemUse" class="form-control" readonly />
          </div>

          <div class="col-md-6 mb-3">
            <label for="itemOutColor" class="form-label">색상(외부)</label>
            <input id="itemOutColor" v-model="ItemDetailData.itemOutColor" class="form-control" readonly />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="itemInColor" class="form-label">색상(내부)</label>
            <input id="itemInColor" v-model="ItemDetailData.itemInColor" class="form-control" readonly />
          </div>

          <div class="col-md-6 mb-3">
            <label for="itemFrameWidth" class="form-label">창틀 폭(mm)</label>
            <input id="itemFrameWidth" v-model="ItemDetailData.itemFrameWidth" class="form-control" readonly />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="itemSpec" class="form-label">유리 사용 두께(mm)</label>
            <input id="itemSpec" v-model="ItemDetailData.glassSize" class="form-control" readonly />
          </div>
        </div>

        <div class="mb-3">
          <label for="itemDescription" class="form-label">제품 설명</label>
          <textarea id="itemDescription" v-model="ItemDetailData.itemDescription" class="form-control" rows="5"
            readonly></textarea>
        </div>

        <div class="form-check form-switch mb-4">
          <input class="form-check-input" type="checkbox" v-model="ItemDetailData.itemYN" id="itemYN" disabled />
          <label class="form-check-label" for="itemYN">공개 여부</label>
        </div>
      </div>

      <div class="col-md-5 d-flex justify-content-center align-items-center">
        <div class="position-relative bg-white p-4 rounded shadow-sm">
          <div v-if="ItemDetailData.itemYN == true">
            <span class="badge bg-success text-dark position-absolute top-0 end-0 mt-2 me-2">등록</span>
          </div>
          <div v-else>
            <span class="badge bg-danger text-dark position-absolute top-0 end-0 mt-2 me-2">미등록</span>
          </div>

          <div v-if="isLoading" class="text-center">기다려 주세요...</div>

          <img v-else class="img-fluid w-100" :src="`/item/${fileBoxesData.fileName}`" alt="제품 이미지" />
        </div>
      </div>

      

    </div>

    <div class="d-flex justify-content-end mt-4">
      <button class="btn btn-dark btn-sm px-4 py-2" @click="modifyItems">수정</button>
      <button class="btn btn-danger btn-sm px-4 py-2 ml-3" @click="deleteItems">삭제</button>
    </div>
    <div v-html="ItemDetailData.freeContent"></div>
  </section>
</template>

<script>
import Editor from '@/components/view/Editor.vue';

export default {
  name: 'ItemDetail',
  data() {
    return {
      DetailItemId: null,
      isLoading: true,

      ItemDetailData: {},
      fileBoxesData: {},
      itemIdsToDelete: [],
    };
  },

  async created() {

    this.DetailItemId = Number(this.$route.params.itemId) || null;

    if (this.DetailItemId) {
      await this.fetchItemDetailData(this.DetailItemId);
    }

    this.isLoading = false;
  },

  components: { Editor },

  methods: {

    async fetchItemDetailData(itemId) {

      try {
        this.isLoading = true;
        const response = await this.$axios.get(`/admin/items/detail?itemId=${itemId}`);


        this.ItemDetailData = response.data || {};
        this.fileBoxesData = response.data.fileBoxes || [];

      } catch (error) {
        console.error('fetchItemDetailData error : ', error);
        this.ItemDetailData = { fileBoxes: [] };
      } finally {
        this.isLoading = false;
      }
    },

    async modifyItems() {
      this.$router.push({
        path: `/admin/item/edit/${this.DetailItemId}`,
      });
    },

    async deleteItems() {

      const isConfirmed = confirm('삭제 시 모든 제품 정보와 파일정보가 삭제 됩니다. 계속 하시겠습니까?');

      if (isConfirmed) {
        this.itemIdsToDelete.push(this.DetailItemId);

        try {
          await this.$axios.delete(`/admin/items`, {
            data: this.itemIdsToDelete,
            headers: { 'Content-Type': 'application/json' }
          });

          alert('제품이 삭제 되었습니다.');
          this.$router.push('/admin/item');

        } catch (error) {
          console.log('deleteItems error: ', error);
        }
      } else {
        alert('삭제가 취소 되었습니다.');
      }
    },
  },
};
</script>

<style scoped>
.image-container img {
  width: 300px;
  height: 300px;
}
</style>