<template>
 
  <section class="container bg-light p-5 rounded shadow-lg">
  <!-- 제품 정보 제목 -->
  <h1 class="text-center fw-bold text-dark mb-4">제품 등록</h1>

  <div class="row">
    <!-- 왼쪽: 제품 정보 입력 -->
    <div class="col-md-7">
      <form @submit.prevent="postItemData">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="itemName" class="form-label">제품명</label>
            <input id="itemName" v-model="itemName" class="form-control" placeholder="제품명을 입력해주세요" />
          </div>

          <div class="col-md-6 mb-3">
            <label for="manuName" class="form-label">제조사</label>
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
            <label for="itemType" class="form-label">제품 타입</label>
            <select id="itemType" v-model="itemType" class="form-control">
              <option value="">제품 타입 선택</option>
              <option v-for="type in ItemTypeData" :key="type.itemTypeId" :value="type.itemTypeName">
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
            <label for="itemSpec" class="form-label">유리 사용 두께(mm)</label>
            <select id="itemSpec" v-model="itemSpec" class="form-control">
              <option value="">유리 두께 선택</option>
              <option v-for="type in GlassTypeData" :key="type.glassSpecId" :value="type.glassSpecSize">
                {{ type.glassSpecSize }}
              </option>
            </select>
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
        <CustomEditor />
        <div class="text-end">
          <button type="submit" class="btn btn-primary">등록</button>
        </div>

        
      </form>
    </div>

    <!-- 오른쪽: 제품 이미지 업로드 -->
    <div class="col-md-5 d-flex justify-content-center align-items-center">
      <div class="position-relative bg-white p-4 rounded shadow-sm">
        <span class="badge bg-warning text-dark position-absolute top-0 end-0 mt-2 me-2">NEW</span>
        <img class="img-fluid w-100" :src="imageUrl || 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg'"
          alt="제품 이미지">
        <div class="mt-3">
          <label for="imageUrl" class="form-label">제품 이미지 업로드</label>
          <input type="file" id="imageUrl" class="form-control" @change="handleFileUpload" />
        </div>
      </div>
    </div>
  </div>

  
</section>

</template>

<script>
import CustomEditor from '@/components/view/CustomEditor.vue';

export default {
  name: 'ItemCreate',
  data() {
    return {
      // img 파일 보류
      inputValue: '',

      itemName: '',
      manuName: '',
      itemNum: '',
      itemType: '',
      itemUse: '',
      itemOutColor: '',
      itemInColor: '',
      itemFrameWidth: '',
      itemSpec: '',
      itemDescription: '',
      itemYN: '',
      isMain: null,
      freeContent: '',
      imageUrl: String,
      fileBoxes: [],

      selectedManu: '',
      updateManufactList: [],

      ItemTypeData: [],
      GlassTypeData: [],

    }
  },

  components: {
    CustomEditor,
  },

  setup() {
    console.log('ItemCreate 페이지가 로드되었습니다.');
  },

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
        console.log('fetchManufactList error', error);
      }
    },

    async fetchItemTypeData() {

      try {

        const response = await this.$axios.get('/admin/type');

        this.ItemTypeData = response.data;
      } catch (error) {
        console.log('fetchItemTypeData error', error);
      }

    },

    async fetchGlassData() {

      try {
        const response = await this.$axios.get('/admin/glass');
        this.GlassTypeData = response.data;
      } catch (error) {
        console.log('fetchGlassData error', error);
      }
    },

    async handleFileUpload(event) {
      // 파일 업로드 시만 처리하고, 데이터는 submit 때 전송
      const files = event.target.files;
      if (files.length > 0) {
        this.fileBoxes = Array.from(files).map(file => {
          const fileUrl = URL.createObjectURL(file);
          return { file, fileUrl };
        });
        this.imageUrl = URL.createObjectURL(files[0]); // 이미지 미리보기
        console.log('this.imageUrl', this.imageUrl);
      }
    },


    async postItemData() {
      const formData = new FormData();

      formData.append("itemName", this.itemName);
      formData.append("manuName", this.manuName);
      formData.append("itemNum", this.itemNum);
      formData.append("itemType", this.itemType);
      formData.append("itemUse", this.itemUse);
      formData.append("itemOutColor", this.itemOutColor);
      formData.append("itemInColor", this.itemInColor);
      formData.append("itemFrameWidth", this.itemFrameWidth);
      formData.append("itemSpec", this.itemSpec);
      formData.append("itemDescription", this.itemDescription);
      formData.append("itemYN", this.itemYN);
      formData.append("freeContent", this.freeContent);


      // 메인 이미지가 먼저 저장 된다.
      if (this.fileBoxes.length > 0) {
        this.fileBoxes.forEach(fileObject => {
          formData.append("files", fileObject.file);  // 메인 이미지 파일
        });
      }

      try {
        await this.$axios.post('/admin/items', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        alert(this.itemName + '이 등록 되었습니다.');
        window.location.href = '/admin/item';
      } catch (error) {
        console.log('제품 등록 실패', error);
        alert('제품 등록 실패!!');
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
/* 스타일 수정 */
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
</style>