<template>
  <section class="container bg-light p-5 rounded shadow-lg">
    <form @submit.prevent="modifyItemData">
    <h1 class="text-center fw-bold text-dark mb-4">제품 수정</h1>

    <!-- Bootstrap Row -->
    <div class="row">
      
      <!-- 좌측 영역: 폼(컬럼 7) -->
      <div class="col-md-7">
        
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
                <!-- 기존 선택값 표시 -->
                <option v-if="!showItemTypeOptions" :value="ItemDetailData.itemTypeId">
                  {{ ItemDetailData.itemType }}
                </option>
                <!-- 선택 리스트 -->
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
              <label for="glassSpecId" class="form-label">유리 두께</label>
              <select id="glassSpecId" v-model="ItemDetailData.glassSpecId" class="form-control"
                @focus="showGlassOptions = true" @blur="showGlassOptions = false">
                <!-- 기존 선택값 표시 -->
                <option v-if="!showGlassOptions" :value="ItemDetailData.glassSpecId">
                  {{ ItemDetailData.glassSize }}
                </option>
                <!-- 선택 리스트 -->
                <option v-for="glassType in GlassTypeData" :key="glassType.glassSpecId" :value="glassType.glassSpecId">
                  {{ glassType.glassSpecSize }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="itemDescription" class="form-label">제품 설명</label>
            <textarea id="itemDescription" v-model="ItemDetailData.itemDescription"
              class="form-control" rows="5"></textarea>
          </div>

          <div class="form-check form-switch mb-4">
            <input class="form-check-input" type="checkbox" v-model="ItemDetailData.itemYN" id="itemYN">
            <label class="form-check-label" for="itemYN">공개 여부</label>
          </div>

          <!-- 수정 버튼 -->
          <div class="text-end">
            <button type="submit" class="btn btn-primary">수정</button>
          </div>

          <!-- 에디터 (현재 레이아웃 그대로) -->
          
        
      </div>

      <!-- 우측 영역: 이미지(컬럼 5) -->
      <div class="col-md-5 d-flex justify-content-center align-items-start">
        <div class="position-relative bg-white p-4 rounded shadow-sm w-100">
          <!-- 등록 / 미등록 배지 -->
          <div v-if="ItemDetailData.itemYN === true">
            <span class="badge bg-success text-dark position-absolute top-0 end-0 mt-2 me-2">
              등록
            </span>
          </div>
          <div v-else>
            <span class="badge bg-warning text-dark position-absolute top-0 end-0 mt-2 me-2">
              미등록
            </span>
          </div>

          <!-- 이미지 표시 -->
          <img
            class="img-fluid w-100"
            :src="ItemFileData.mainPreviewUrl || (ItemFileData.fileName 
                   ? `/item/${ItemFileData.fileName}` 
                   : 'https://dummyimage.com/900x400/dee2e6/6c757d.jpg')"
            alt="제품 이미지"
          />

          <!-- 이미지 업로드 -->
          <div class="mt-3">
            <label for="imageUrl" class="form-label">제품 이미지 업로드</label>
            <input
              type="file"
              id="imageUrl"
              class="form-control"
              @change="handleMainFileUpload"
            />
          </div>
        </div>
      </div>

    </div>
    <Editor v-model="ItemDetailData.freeContent" />
  </form>
  </section>
</template>

<script>
import Editor from '@/components/view/Editor.vue';

export default {

  name: "ItemEdit",
  data() {
    return {
      modifyItemId: null,

      fileDeleted: false,
      showGlassOptions: false,
      showItemTypeOptions: false,

      ItemTypeData: [],
      GlassTypeData: [],

      mainFile: {},
      ItemDetailData: {},
      ItemFileData: {},
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

        this.ItemFileData = response.data.fileBoxes ? response.data.fileBoxes : { fileName: null };

        if (!this.ItemDetailData.freeContent) {
          this.ItemDetailData.freeContent = "";
        }

      } catch (error) {
        console.error('fetchItemDetailData error: ', error);
      }
    },


    async fetchItemTypeData() {

      try {
        const response = await this.$axios.get('/admin/type');

        this.ItemTypeData = response.data;

      } catch (error) {
        console.error('fetchItemTypeData error: ', error);
      }
    },

    async fetchGlassTypeData() {
      try {

        const response = await this.$axios.get('/admin/glass');
        this.GlassTypeData = response.data;

      } catch (error) {
        console.error('fetchGlassTypeData error: ', error);
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

      formData.append("mainFile", this.ItemFileData.file);

      formData.append("updateItemDTO", new Blob([JSON.stringify(updateItemDTO)],
        { type: "application/json" }));

      try {

        await this.$axios.post("/admin/items/update", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      
        alert("수정 완료");
        this.$router.push(`/admin/item/${this.modifyItemId}`);
      
      } catch (error) {
        console.error("modifyItemData error: ", error);
      }
    },

    async handleMainFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.ItemFileData = {
          ...this.ItemFileData,
          file,
          fileName: file.name,
          mainPreviewUrl: URL.createObjectURL(file)
        };
      }
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

.Editor {
  width: 100%;
}

img.img-fluid {
  max-height: 400px;
  object-fit: contain;
}
</style>
