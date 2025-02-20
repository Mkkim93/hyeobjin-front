<template>
  <section class="container bg-light p-5 rounded shadow-lg">
    <h1 class="text-center fw-bold text-dark mb-4">제품 등록</h1>
    <small class="warn-container">(* 표시는 필수 입력 사항입니다. 꼭 입력하신 후 제품을 등록해주세요)</small>

    <div class="row">
      <div class="col-md-7">
        <form @submit.prevent="postItemData">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemName" class="form-label">제품명</label>
              <input id="itemName" v-model="itemName" class="form-control" placeholder="제품명을 입력해주세요" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="manuName" class="form-label">제조사 * </label>
              <select id="manuName" v-model="manuName" class="form-control">
                <option value="">제조사 선택</option>
                <option v-for="manu in updateManufactList" :key="manu.manuId" :value="manu.manuName">
                  {{ manu.manuName }}
                </option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemNum" class="form-label">품번</label>
              <input id="itemNum" v-model="itemNum" class="form-control" placeholder="품번을 입력해주세요" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="itemTypeId" class="form-label">제품 타입 *</label>
              <select id="itemTypeId" v-model="itemTypeId" class="form-control">
                <option value="">제품 타입 선택</option>
                <option v-for="type in ItemTypeData" :key="type.itemTypeId" :value="type.itemTypeId">
                  {{ type.itemTypeName }}
                </option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemUse" class="form-label">제품 용도</label>
              <input id="itemUse" v-model="itemUse" class="form-control" placeholder="제품 용도를 입력해주세요" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="itemOutColor" class="form-label">색상(외부)</label>
              <input id="itemOutColor" v-model="itemOutColor" class="form-control" placeholder="외부 색상을 입력해주세요" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="itemInColor" class="form-label">색상(내부)</label>
              <input id="itemInColor" v-model="itemInColor" class="form-control" placeholder="내부 색상을 입력해주세요" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="itemFrameWidth" class="form-label">창틀 폭(mm)</label>
              <input id="itemFrameWidth" v-model="itemFrameWidth" class="form-control" placeholder="창틀 폭(mm)을 입력해주세요" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="glassSpecId" class="form-label">유리 사용 두께(mm) *</label>
              <select id="glassSpecId" v-model="glassSpecId" class="form-control">
                <option value="">유리 두께 선택</option>
                <option v-for="type in GlassTypeData" :key="type.glassSpecId" :value="type.glassSpecId">
                  {{ type.glassSpecSize }}
                </option>
              </select>
              <small class="warn-glass">터닝 도어 등록 시 '-' 를 필수로 선택해주세요</small>
            </div>
          </div>

          <div class="mb-3">
            <label for="itemDescription" class="form-label">제품 설명</label>
            <textarea id="itemDescription" v-model="itemDescription" class="form-control" rows="5"
              placeholder="제품 설명을 입력해주세요"></textarea>
          </div>

          <div class="form-check form-switch mb-4">
            <input class="form-check-input" type="checkbox" v-model="itemYN" id="itemYN">
            <label class="form-check-label" for="itemYN">공개 여부</label>
          </div>

          

          <div class="text-end my-5">
            <button type="submit" class="btn btn-primary">등록</button>
          </div>

        </form>
      </div>
      <div class="col-md-4 d-flex justify-content-center align-items-start">
        <div class="position-relative bg-white p-4 rounded shadow-sm">
          <span class="badge bg-warning text-dark position-absolute top-0 end-0 mt-0 me-2">NEW</span>
          <img class="img-fluid w-100" :src="imageUrl" alt="제품 이미지">
          <div class="mt-5">
            <label for="imageUrl" class="form-label">제품 이미지 업로드</label>
            <input type="file" id="imageUrl" class="form-control" @change="handleFileUpload" />
          </div>
        </div>
      </div>

    </div>
    <div class="editor-container d-flex flex-column w-100">
            <Editor class="w-100" v-model="freeContent" />
          </div>
  </section>
</template>

<script>
import Editor from '@/components/view/Editor.vue';

export default {
  name: 'ItemCreate',
  data() {
    return {
      inputValue: '',

      itemName: '',
      manuName: '',
      itemNum: '',
      itemUse: '',
      itemOutColor: '',
      itemInColor: '',
      itemFrameWidth: '',
      itemDescription: '',
      itemYN: '',
      isMain: null,
      freeContent: '',
      glassSpecId: '',
      itemTypeId: '',

      selectedManu: '',

      imageUrl: String,

      updateManufactList: [],
      GlassTypeData: [],
      ItemTypeData: [],
      fileBoxes: [],
    }
  },

  components: { Editor },

  created() {
    this.fetchManufactList();
    this.fetchItemTypeData();
    this.fetchGlassData();
  },

  methods: {

    async fetchManufactList() {

      try {

        const response = await this.$axios.get('/admin/manu/count');

        this.updateManufactList = response.data;

      } catch (error) {
        console.error('fetchManufactList error: ', error);
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

    async fetchGlassData() {

      try {
        const response = await this.$axios.get('/admin/glass');

        this.GlassTypeData = response.data;

      } catch (error) {
        console.error('fetchGlassData error: ', error);
      }
    },

    async handleFileUpload(event) {
      const files = event.target.files;

      if (files.length > 0) {
        this.fileBoxes = Array.from(files).map(file => {
          const fileUrl = URL.createObjectURL(file);
          return { file, fileUrl };
        });
        this.imageUrl = URL.createObjectURL(files[0]);
      }
    },

    async postItemData() {
      const formData = new FormData();

      const createItemDTO = {

        itemName: this.itemName,
        manuName: this.manuName,
        itemNum: this.itemNum,
        itemUse: this.itemUse,
        itemOutColor: this.itemOutColor,
        itemInColor: this.itemInColor,
        itemFrameWidth: this.itemFrameWidth,
        itemDescription: this.itemDescription,
        itemYN: this.itemYN,
        freeContent: this.freeContent,
        glassSpecId: this.glassSpecId,
        itemTypeId: this.itemTypeId
      };

      formData.append("createItemDTO", new Blob([JSON.stringify(createItemDTO)],
      { type: "application/json" }));    

      if (this.fileBoxes.length > 0) {
        this.fileBoxes.forEach(fileObject => {
          formData.append("files", fileObject.file);
        });
      }

      try {

        if (!this.glassSpecId) {
          alert('유리 사양은 필수 선택 사항입니다. 다시 선택해주세요.');
          return; 
        }

        if (!this.manuName) {
          alert('제조사명은 필수 선택 사항입니다. 다시 선택해주세요.');
          return;
        }

        if (!this.itemTypeId) {
          alert('제품 타입은 필수 선택 사항입니다. 다시 선택해주세요.');
          return;
        }

        await this.$axios.post('/admin/items', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert(this.itemName + '이 등록 되었습니다.');
        window.location.href = '/admin/item';

      } catch (error) {
        console.error('제품 등록 실패', error);
        alert('알수 없는 이유로 제품 등록이 실패하였습니다. 관리자에게 문의 해주세요.');
      }
    }
  },

  handleFocus() {
    if (!this.inputValue) {
      this.inputValue = '';
    }
  },

  handleBlur() {
    if (!this.inputValue) {
      this.inputValue = '';
    }
  },
}

</script>

<style scoped>
label {
  font-weight: bold;
}

.mt-3 {
  width: 100%;
}

.footer-button-plus {
  margin-top: 20px;
}

.img-thumbnail {
  max-width: 150px;
  height: auto;
}

.warn-glass,
.warn-container {
  color: red;
}

.warn-container {
  display: block; /* 인라인 요소를 블록처럼 만들어 중앙 정렬 가능 */
  text-align: center; /* 텍스트를 중앙 정렬 */
  color: #dc3545; /* 경고 색상 (부트스트랩 'danger' 색상 참고) */
  font-size: 14px; /* 크기 조정 */
  margin-top: -10px; /* h1과의 간격 줄이기 */
  margin-bottom: 20px; /* 아래쪽 여백 추가 */
}
</style>