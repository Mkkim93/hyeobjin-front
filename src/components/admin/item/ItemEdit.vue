<template>
  <p>제품 수정 페이지 입니다.</p>
  <section class="py-5">

    <div class="container px-4 px-lg-5 my-5">
      <div class="col-md-6">
        <div class="image-container">
          <img :src="mainFile.mainPreviewUrl || `/item/${mainFile.fileName}`" alt="제품 이미지" />
          <div class="mt-3">
            <label for="imageUrl">제품 이미지 업로드:</label>
            <input type="file" id="imageUrl" ref="fileInput" @change="handleMainFileUpload" />
          </div>
        </div>
      </div>

      <form @submit.prevent="modifyItemData">
        <div class="row gx-4 gx-lg-5 align-items-center">

          <div class="col-md-6">
            <div class="fs-5 mb-5">

              <label for="itemName">제품명 :
                <input id="itemName" v-model="ItemDetailData.itemName" @focus="handleFocus" @blur="handleBlur" />
              </label>

              <label for="manuName">제조사 :
                <input id="manuName" v-model="ItemDetailData.manuName" @focus="handleFocus" @blur="handleBlur" readonly
                  disabled />
              </label>

              <label for="itemNum">품번 :
                <input id="itemNum" v-model="ItemDetailData.itemNum" @focus="handleFocus" @blur="handleBlur" />
              </label>

              <label for="itemType">타입 :
                <input id="itemType" v-model="ItemDetailData.itemType" @focus="handleFocus" @blur="handleBlur" />
              </label>

              <label for="itemUse">제품 용도 :
                <input id="itemUse" v-model="ItemDetailData.itemUse" @focus="handleFocus" @blur="handleBlur" />
              </label>

              <label for="itemOutColor">색상(외부) :
                <input id="itemOutColor" v-model="ItemDetailData.itemOutColor" @focus="handleFocus"
                  @blur="handleBlur" />
              </label>

              <label for="itemInColor">색상(내부) :
                <input id="itemInColor" v-model="ItemDetailData.itemInColor" @focus="handleFocus" @blur="handleBlur" />
              </label>

              <label for="itemFrameWidth">창틀 폭(mm) :
                <input id="itemFrameWidth" v-model="ItemDetailData.itemFrameWidth" @focus="handleFocus"
                  @blur="handleBlur" />
              </label>

              <label for="itemSpec">유리 사용 두께(mm) :
                <input id="itemSpec" v-model="ItemDetailData.itemSpec" @focus="handleFocus" @blur="handleBlur" />
              </label>

              <label for="itemDescription">제품 설명 :
                <textarea id="itemDescription" v-model="ItemDetailData.itemDescription" @focus="handleFocus"
                  @blur="handleBlur" :style="{ width: '800px', height: '500px' }" />
              </label>

              <!-- input -->
              <p class="lead">
                아래에 체크 시 제품이 사용자에게 보여집니다.
                버튼을 체크 하지 않으면 관리자만 해당 제품을 볼 수 있습니다.</p>
              <div class="d-flex">

                <!-- 체크박스를 통해 제품을 등록/미등록 상태로 만들지 구현 -->
                <label for="itemYN">
                  <input type="radio" id="itemYN" name="itemYN" value="Y" v-model="ItemDetailData.itemYN" />
                  공개
                </label>

                <label for="itemYN">
                  <input type="radio" id="itemYN" name="itemYN" value="N" v-model="ItemDetailData.itemYN" />
                  비공개
                </label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
    <p>-----------------------------------------------------------------------</p>
    <div>

      <div v-for="(file, index) in subFile" :key="index" class="image-item" style="position: relative;">
        <!-- 수정 및 삭제 버튼을 우측 상단에 배치 -->
        <button @click="triggerFileInput(index, file.fileBoxId)" class="edit-button">수정</button>
        <button @click="removeSubFile(index, file.fileBoxId)" class="delete-button">삭제</button>

        <!-- 이미지 -->
        <img :src="file.subPreviewUrl || `/itemsub/${file.fileName}`" alt="File Image" />

        <p>{{ file.fileName }}</p>
        <input ref="fileInput" type="file" style="display: none" :id="'file-input-' + index"
          @change="handleFileChange(index, file.fileBoxId)" />
      </div>

      <div class="footer">
        <ul class="footer-button-plus">
          <input @change="uploadNewFile" multiple type="file" id="file" class="inputfile" />
          <label for="file" class="input-plus">+</label>
        </ul>
      </div>

      <div style="margin-top : 500px"></div>

    </div>
  </section>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import '@/assets/styles/itemcreate.css';
export default {
  name: 'ItemEdit',
  data() {
    return {
      ItemDetailData: [],
      modifyItemId: null,


      mainFile: Object,
      subFile: Array,

      subPreviewUrl: null,
      mainPreviewUrl: null,

      deletedFiles: [], // 삭제된 파일 관리

    }
  },

  props: ['itemId'],

  created() {
    this.modifyItemId = Number(this.itemId);
    this.fetchItemDetailData(this.modifyItemId);
  },

  methods: {

    async triggerFileInput(index, fileBoxId) {
      console.log('trigger fileBoxId', fileBoxId);
      const inputElement = this.$refs.fileInput[index];
      inputElement.click();
    },

    async handleFileChange(index, fileBoxId) {
      console.log('handle fileBoxId', fileBoxId);
      const inputElement = this.$refs.fileInput[index];
      const file = inputElement.files[0];

      // 해당 파일 객체에 previewUrl을 설정
      this.subFile[index].subPreviewUrl = URL.createObjectURL(file);
      console.log('this.subFile.subPreviewUrl', this.subFile.subPreviewUrl);

      if (file) {
        console.log('Selected file:', file);
        console.log('fileBoxId', fileBoxId);
        // 파일 처리 로직을 추가 (예: 업로드 또는 파일 미리보기)
        const formData = new FormData();
        formData.append("files", file);

        try {
          await this.$axios.post(`/item/files?fileBoxId=${fileBoxId}`, formData);
        } catch (error) {
          console.log('sub file update error', error);
        }
      }
    },
    // 0. 수정할 제품 데이터 조회
    async fetchItemDetailData(itemId) {
      try {
        const response = await this.$axios.get(`/admin/items/modify?itemId=${itemId}`);
        this.ItemDetailData = response.data;
        // fileBoxex 의 배열을 순차적으로 순회하여 isMain 값이 true 인 값을 mainFile 에 넣는다.
        this.mainFile = this.ItemDetailData.fileBoxes.find(file => file.isMain === true); // object


        this.subFile = this.ItemDetailData.fileBoxes.filter(file => file.isMain === false); // array
        console.log('subFile', this.subFile);

        console.log('mainFile', this.mainFile);

      } catch (error) {
        console.log('fetchModifyData', error);
      }
    },

    // 1. 수정된 제품 데이터 저장
    async modifyItemData() {
      const formData = new FormData();
      // 기본 데이터 추가
      formData.append("itemId", this.modifyItemId);
      formData.append("itemName", this.ItemDetailData.itemName);
      formData.append("itemNum", this.ItemDetailData.itemNum);
      formData.append("itemType", this.ItemDetailData.itemType);
      formData.append("itemUse", this.ItemDetailData.itemUse);
      formData.append("itemOutColor", this.ItemDetailData.itemOutColor);
      formData.append("itemInColor", this.ItemDetailData.itemInColor);
      formData.append("itemFrameWidth", this.ItemDetailData.itemFrameWidth);
      formData.append("itemSpec", this.ItemDetailData.itemSpec);
      formData.append("itemDescription", this.ItemDetailData.itemDescription);
      formData.append("itemYN", this.ItemDetailData.itemYN);

      try {
        await this.$axios.post('/admin/items/update', formData);
        alert('수정 완료');
        window.location.href = '/admin/item';
      } catch (error) {
        console.error('fetch update failed', error);
      }
    },

    // ** 여기서 부터 파일 수정 및 삭제
    // 3-1. 서브 파일 삭제 
    async removeSubFile(index, fileBoxId) {
      const removedFile = this.subFile.splice(index, 1)[0];

      console.log('index (fileBoxId)', fileBoxId);

      this.deletedFiles.push(removedFile); // 삭제된 파일 관리

      await this.$axios.delete(`/item/files?fileBoxId=${fileBoxId}`);
    },


    // 2. 메인 파일 수정 (메인 파일은 하나씩 수정)
    async handleMainFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.mainFile.fileName = file.name;
        this.mainFile.mainPreviewUrl = URL.createObjectURL(file);
        this.mainFile.file = file;

        const formData = new FormData();
        formData.append("files", file);

        try {
          await this.$axios.post(`/item/files?fileBoxId=${this.mainFile.fileBoxId}`, formData); // Content-Type은 자동으로 처리됨
        } catch (error) {
          console.error("파일 수정 실패", error);
        }
      }
    },

    async uploadNewFile(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("files", file);
        formData.append("isMain", false);
        formData.append("itemId", this.modifyItemId);

        try {
          // 파일 업로드 요청
          const response = await this.$axios.post('item/files/add', formData);

          // 업로드된 파일에 대한 정보를 subFile 배열에 추가
          const uploadedFile = {
            fileName: response.data.fileName,  // 서버에서 반환된 파일 이름
            subPreviewUrl: URL.createObjectURL(file), // 즉시 미리보기 URL 생성
            fileBoxId: response.data.fileBoxId  // 서버에서 반환된 파일 ID
          };

          this.subFile.push(uploadedFile); // subFile 배열에 새 파일 추가
          console.log('파일 저장 성공');
        } catch (error) {
          console.log('실패', error);
        }
      }
    },

  }
}



</script>

<style scoped>
.image-item {
  position: relative; /* 부모 요소에 상대 위치를 설정 */
  display: inline-block;
  margin: 10px;
}

.edit-button,
.delete-button {
  position: absolute; /* 절대 위치로 버튼을 배치 */
  top: 10px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  z-index: 1;
}

.delete-button {
  top: 30px; /* 삭제 버튼은 수정 버튼 아래에 배치 */
}

.edit-button:hover,
.delete-button:hover {
  background-color: #f0f0f0;
}

.footer {
  width: 100%;
  position: sticky;  /* Make it fixed at the bottom */
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
  z-index: 9999;  /* Ensure it's above other elements */
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}
</style>