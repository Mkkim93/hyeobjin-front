<template>
  <h1 class="text-2xl font-bold text-center mb-5">제품 수정</h1>
  <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <!-- 메인 이미지 영역 -->
      <div class="col-md-6">
        <div class="image-container" v-for="(file, index) in mainFile" :key="index">
          <!-- mainFile: computed 프로퍼티에서 추출한 메인 파일 -->
          <div v-if="file.isMain === true">
            <img :src="mainFile.mainPreviewUrl || `/item/${file.fileName}`" alt="제품 이미지" class="product-image" />
          </div>
        </div>
        <div class="mt-3">
          <label for="imageUrl">제품 이미지 업로드:</label>
          <!-- 메인 파일 선택 시 handleMainFileUpload 호출 -->
          <input type="file" id="imageUrl" @change="handleMainFileUpload" />
        </div>
      </div>

      <!-- 제품 정보 및 수정 데이터 전송 폼 -->
      <form @submit.prevent="modifyItemData">
        <div class="row gx-4 gx-lg-5 align-items-center">
          <div class="col-md-6">
            <div class="fs-5 mb-5">
              <label for="itemName">
                제품명 :
                <input id="itemName" v-model="ItemDetailData.itemName" @focus="handleFocus" @blur="handleBlur" />
              </label>
              <label for="manuName">
                제조사 :
                <input id="manuName" v-model="ItemDetailData.manuName" @focus="handleFocus" @blur="handleBlur" readonly
                  disabled />
              </label>
              <label for="itemNum">
                품번 :
                <input id="itemNum" v-model="ItemDetailData.itemNum" @focus="handleFocus" @blur="handleBlur" />
              </label>
              <label for="itemType">
                타입 :
                <input id="itemType" v-model="ItemDetailData.itemType" @focus="handleFocus" @blur="handleBlur" />
              </label>
              <label for="itemUse">
                제품 용도 :
                <input id="itemUse" v-model="ItemDetailData.itemUse" @focus="handleFocus" @blur="handleBlur" />
              </label>
              <label for="itemOutColor">
                색상(외부) :
                <input id="itemOutColor" v-model="ItemDetailData.itemOutColor" @focus="handleFocus"
                  @blur="handleBlur" />
              </label>
              <label for="itemInColor">
                색상(내부) :
                <input id="itemInColor" v-model="ItemDetailData.itemInColor" @focus="handleFocus" @blur="handleBlur" />
              </label>
              <label for="itemFrameWidth">
                창틀 폭(mm) :
                <input id="itemFrameWidth" v-model="ItemDetailData.itemFrameWidth" @focus="handleFocus"
                  @blur="handleBlur" />
              </label>
              <label for="itemSpec">
                유리 사용 두께(mm) :
                <input id="itemSpec" v-model="ItemDetailData.itemSpec" @focus="handleFocus" @blur="handleBlur" />
              </label>
              <label for="itemDescription">
                제품 설명 :
                <textarea id="itemDescription" v-model="ItemDetailData.itemDescription" @focus="handleFocus"
                  @blur="handleBlur" :style="{ width: '800px', height: '500px' }"></textarea>
              </label>
              <p class="lead">
                아래에 체크 시 제품이 사용자에게 보여집니다.
                버튼을 체크 하지 않으면 관리자만 해당 제품을 볼 수 있습니다.
              </p>
              <div class="d-flex">
                <label>
                  <input type="radio" name="itemYN" value="Y" v-model="ItemDetailData.itemYN" /> 공개
                </label>
                <label>
                  <input type="radio" name="itemYN" value="N" v-model="ItemDetailData.itemYN" /> 비공개
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <!-- 서브 파일 영역 -->
        <div class="sub-container">
          <!-- subFiles: computed 프로퍼티에서 추출한 서브 파일 배열 -->
          <div v-for="(file, index) in subFile" :key="index" class="image-item">
            <div v-if="file.isMain === false">
              <img :src="file.subPreviewUrl || `/itemsub/${file.fileName}`" alt="File Image"
                class="sub-product-image" />
              <p>{{ file.fileName }}</p>
              <button button type="button" @click="triggerFileInput(index, file.fileBoxId)"
                class="edit-button">수정</button>
              <button button type="button" @click="removeSubFile(index, file.fileBoxId)"
                class="delete-button">삭제</button>
              <input type="file" style="display: none" :id="'file-input-' + index"
                @change="handleFileChange(index, file.fileBoxId, $event)" />
            </div>

          </div>
          <div class="footer">
            <ul class="footer-button-plus">
              <input @change="handleNewSubFile($event)" multiple type="file" id="file" class="inputfile" />
              <label for="file" class="input-plus">+</label>
            </ul>
          </div>
          <div style="margin-top: 500px"></div>
        </div>

        <!-- 제출 버튼 -->
        <button type="submit">수정</button>
      </form>
    </div>
  </section>
</template>


<script>
export default {
  name: "ItemEdit",
  data() {
    return {
      ItemDetailData: {},     // 제품 정보 (itemName, itemNum, 등)
      modifyItemId: null,
      mainFile: [],           // { file, fileName, mainPreviewUrl, fileBoxId, updated }
      allFiles: [],             // 각 항목: { file, fileName, subPreviewUrl, fileBoxId, updated }
      subFile: [],
    };
  },
  props: ["itemId"],
  created() {
    this.modifyItemId = Number(this.itemId);
    this.fetchItemDetailData(this.modifyItemId);
  },

  methods: {

    async fetchItemDetailData(modifyItemId) {

      try {
        const response = await this.$axios.get(`/admin/items/modify?itemId=${modifyItemId}`);

        this.ItemDetailData = response.data;
        this.ItemFileData = response.data.fileBoxes;

        this.mainFile = this.ItemFileData.filter(file => file.isMain === true);
        this.subFile = this.ItemFileData.filter(file => file.isMain === false);
        console.log('fileData', response.data.fileBoxes);
      } catch (error) {
        console.log('error', error);
      }
    },

    async modifyItemData() {
      const formData = new FormData();

      // 제품 기본 정보 추가
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

      this.mainFile.forEach(fileObj => {
        if (fileObj.file && fileObj.updated) {
          formData.append("mainFile", fileObj.file);
        }
      });

      this.subFile.forEach(fileObj => {
        if (fileObj.file && fileObj.updated) {
          formData.append("subFiles", fileObj.file);
        }
      });

      try {
        console.log('formData', formData);
        await this.$axios.post("/admin/items/update", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        // alert("수정 완료");
        // window.location.href = "/admin/item";
      } catch (error) {
        console.error("제품 업데이트 실패", error);
      }
    },

    // 포커스/블러 이벤트 (필요 시 구현)
    handleFocus() { },
    handleBlur() { },

    async removeSubFile(index, fileBoxId) {
      // 만약 기존 파일(이미 DB에 저장된)이면, 삭제 처리 플래그를 별도 배열에 저장하는 방식도 고려
      console.log('index', index);
      console.log('delete fileBoxId', fileBoxId);
      this.subFile.splice(index, 1);

      try {
        await this.$axios.delete(`/item/files?fileBoxId=${fileBoxId}`);
      } catch (error) {
        console.log('error', error);
      }

    },

    async handleMainFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.mainFile.file = file;
        this.mainFile.fileName = file.name;
        this.mainFile.mainPreviewUrl = URL.createObjectURL(file);
        this.mainFile.updated = true; // 변경됨을 명시
      }
    },

    // 트리거: 수정 버튼 클릭 시 해당 파일 입력 요소 활성화
    async triggerFileInput(index, fileBoxId) {
      const inputEl = document.getElementById(`file-input-${index}`);
      if (inputEl) {
        inputEl.click();
      }
    },


    // 기존 서브 파일 수정 시: 해당 인덱스 파일 객체 업데이트 및 업데이트 플래그 저장
    async handleFileChange(index, fileBoxId, event) {
      const file = event.target.files[0];
      if (file) {
        this.subFile[index].file = file;
        this.subFile[index].subPreviewUrl = URL.createObjectURL(file);
        this.subFile[index].updated = true;
      }
    },


    // 신규 서브 파일 추가 시: 파일 객체를 추가하고 업데이트 플래그 true 설정
    async handleNewSubFile(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newFile = {
          file: file,
          fileName: file.name,
          subPreviewUrl: URL.createObjectURL(file),
          updated: true // 신규 파일이므로 업데이트됨
        };
        this.subFile.push(newFile);
      }
    },
  }
}
</script>

<style scoped>
.image-item {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.edit-button,
.delete-button {
  position: absolute;
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
  top: 30px;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #f0f0f0;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
  z-index: 9999;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

.product-image {
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.sub-product-image {
  max-width: 150px;
  max-height: 150px;
  object-fit: contain;
}
</style>
