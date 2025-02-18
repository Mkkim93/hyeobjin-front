<template>
  <section class="container bg-light p-5 rounded shadow-lg">
    <!-- 제품 정보 제목 -->
    <h1 class="text-center fw-bold text-dark mb-4">제품 수정</h1>

    <div class="row">
      <!-- 왼쪽: 제품 설명 및 폼 -->
      <div class="col-md-7">


        <!-- 제품 정보 폼 -->
        <form @submit.prevent="modifyItemData">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemName" class="form-label">제품명</label>
              <input id="itemName" v-model="ItemDetailData.itemName" class="form-control" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="manuName" class="form-label">제조사</label>
              <input id="manuName" v-model="ItemDetailData.manuName" class="form-control" readonly disabled />
            </div>

          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemNum" class="form-label">품번</label>
              <input id="itemNum" v-model="ItemDetailData.itemNum" class="form-control" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="itemType" class="form-label">제품 타입</label>
              <select id="itemType" v-model="ItemDetailData.itemTypeId" class="form-control"
                @focus="showItemTypeOptions = true" @blur="showItemTypeOptions = false">
                <!-- 현재 선택된 값 (셀렉트 박스가 닫혀 있을 때) -->
                <option v-if="!showItemTypeOptions" :value="ItemDetailData.itemTypeId">
                  {{ ItemDetailData.itemType }}
                </option>

                <!-- 받아온 타입 목록 (셀렉트 박스를 열었을 때) -->
                <option v-for="type in ItemTypeData" :key="type.itemTypeId" :value="type.itemTypeId">
                  {{ type.itemTypeName }}
                </option>
              </select>
            </div>

          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemUse" class="form-label">제품 용도</label>
              <input id="itemUse" v-model="ItemDetailData.itemUse" class="form-control" />
            </div>
            <div class="col-md-6 mb-3">
              <label for="itemOutColor" class="form-label">색상(외부)</label>
              <input id="itemOutColor" v-model="ItemDetailData.itemOutColor" class="form-control" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemInColor" class="form-label">색상(내부)</label>
              <input id="itemInColor" v-model="ItemDetailData.itemInColor" class="form-control" />
            </div>
            <div class="col-md-6 mb-3">
              <label for="itemFrameWidth" class="form-label">창틀 폭(mm)</label>
              <input id="itemFrameWidth" v-model="ItemDetailData.itemFrameWidth" class="form-control" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemType" class="form-label">제품 타입</label>
              <select id="itemType" v-model="ItemDetailData.glassSpecId" class="form-control"
                @focus="showGlassOptions = true" @blur="showGlassOptions = false">
                <!-- 현재 선택된 값 (셀렉트 박스가 닫혀 있을 때) -->
                <option v-if="!showGlassOptions" :value="ItemDetailData.glassSpecId">
                  {{ ItemDetailData.glassSize }}
                </option>

                <!-- 받아온 타입 목록 (셀렉트 박스를 열었을 때) -->
                <option v-for="glassType in GlassTypeData" :key="glassType.glassSpecId" :value="glassType.glassSpecId">
                  {{ glassType.glassSpecSize }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="itemDescription" class="form-label">제품 설명</label>
            <textarea id="itemDescription" v-model="ItemDetailData.itemDescription" class="form-control"
              rows="5"></textarea>
          </div>

          <div class="form-check form-switch mb-4">
            <input class="form-check-input" type="checkbox" v-model="ItemDetailData.itemYN" id="itemYN">
            <label class="form-check-label" for="itemYN">공개 여부</label>
          </div>

          <div class="text-end">
            <button type="submit" class="btn btn-primary">수정</button>
            <Editor />
          </div>
        </form>
      </div>

      <!-- 오른쪽: 제품 이미지 -->
      <div class="col-md-5 d-flex justify-content-center align-items-center">
        <div class="position-relative bg-white p-4 rounded shadow-sm">
          <div v-if="ItemDetailData.itemYN == true">
            <span class="badge bg-success text-dark position-absolute top-0 end-0 mt-2 me-2">
              등록
            </span>
          </div>
          <div v-else>
            <span class="badge bg-warning text-dark position-absolute top-0 end-0 mt-2 me-2">미등록</span>
          </div>

          <img class="img-fluid w-100"
            :src="ItemFileData.mainPreviewUrl || (ItemFileData.fileName ? `/item/${ItemFileData.fileName}` : 'https://dummyimage.com/900x400/dee2e6/6c757d.jpg')"
            alt="제품 이미지" />
          <div class="mt-3">
            <label for="imageUrl" class="form-label">제품 이미지 업로드</label>
            <input type="file" id="imageUrl" class="form-control" @change="handleMainFileUpload" />
          </div>
        </div>
      </div>
    </div>


  </section>


</template>

<script>
import Editor from '@/components/view/Editor.vue';

export default {

  name: "ItemEdit",
  data() {
    return {
      ItemDetailData: {},

      ItemFileData: {},
      modifyItemId: null,
      mainFile: {},
      fileDeleted: false,

      showGlassOptions: false,
      showItemTypeOptions: false,

      ItemTypeData: [],
      GlassTypeData: [],
    };
  },
  props: ["itemId"],

  created() {
    this.modifyItemId = Number(this.itemId);
    this.fetchItemDetailData(this.modifyItemId);
    this.fetchItemTypeData();
    this.fetchGlassTypeData();
  },

  components: {
    Editor,
  },

  methods: {

    async fetchItemDetailData(itemId) {
      try {
        const response = await this.$axios.get(`/admin/items/modify?itemId=${itemId}`);

        this.ItemDetailData = response.data;
        console.log('response', response);

        // ✅ fileBoxes가 없으면 기본값 설정
        this.ItemFileData = response.data.fileBoxes ? response.data.fileBoxes : { fileName: null };

        console.log('this.ItemFileData', this.ItemFileData);

        if (!this.ItemDetailData.freeContent) {
          this.ItemDetailData.freeContent = "";
        }

      } catch (error) {
        console.log('error', error);
      }
    },


    async fetchItemTypeData() {

      try {
        const response = await this.$axios.get('/admin/type');
        this.ItemTypeData = response.data;
        console.log('fetchItemTypeData', this.ItemTypeData);
      } catch (error) {
        console.log('fetchItemTypeData error', error);
      }
    },

    async fetchGlassTypeData() {
      try {
        const response = await this.$axios.get('/admin/glass');
        this.GlassTypeData = response.data;
        console.log('fetchGlassTypeData', this.GlassTypeData);
      } catch (error) {
        console.log('fetchGlassTypeData error', error);
      }
    },

    async modifyItemData() {

      const formData = new FormData();

      const updateItemDTO = {
        itemId: this.modifyItemId,
        itemName: this.ItemDetailData.itemName,
        itemNum: this.ItemDetailData.itemNum,
        itemType: this.ItemDetailData.itemType,
        itemUse: this.ItemDetailData.itemUse,
        itemOutColor: this.ItemDetailData.itemOutColor,
        itemInColor: this.ItemDetailData.itemInColor,
        itemFrameWidth: this.ItemDetailData.itemFrameWidth,
        itemSpec: this.ItemDetailData.itemSpec,
        itemDescription: this.ItemDetailData.itemDescription,
        itemYN: this.ItemDetailData.itemYN,
        freeContent: this.ItemDetailData.freeContent,
        fileBoxId: this.ItemFileData.fileBoxId,
        itemTypeId: this.ItemDetailData.itemTypeId,
        glassSpecId: this.ItemDetailData.glassSpecId,
      }

      console.log('fileBoxId', updateItemDTO.fileBoxId);

      formData.append("mainFile", this.ItemFileData.file);

      formData.append("updateItemDTO", new Blob([JSON.stringify(updateItemDTO)], {
        type: "application/json"
      }));

      try {
        console.log('수정할 폼 데이타 formData', formData);
        // console.log('수정할 fileBoxId', fileBoxId);

        await this.$axios.post("/admin/items/update", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("수정 완료");
        this.$router.push(`/admin/item/${this.modifyItemId}`);
      } catch (error) {
        console.error("제품 업데이트 실패", error);
      }
    },

    // 포커스/블러 이벤트 (필요 시 구현)
    handleFocus() { },
    handleBlur() { },



    async handleMainFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.ItemFileData = {
          ...this.ItemFileData, // ✅ 기존 fileBoxId 유지
          file,
          fileName: file.name,
          mainPreviewUrl: URL.createObjectURL(file)
        };
      }
      console.log("Updated mainFile:", this.ItemFileData);
    },


    async itemYNChange() {
      if (this.ItemDetailData.itemYN == 'Y') {
        return this.ItemDetailData.itemYN == 'N';
      }
    }
  }
}
</script>

<style scoped>
.product-image {
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
}
</style>
