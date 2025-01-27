<template>
  <p>제품 수정 페이지 입니다.</p>
  <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <form @submit.prevent="modifyItemData">
      <div class="row gx-4 gx-lg-5 align-items-center">

      <div class="col-md-6">
        <div class="image-container">
          <!-- <img :src="`/item/${ItemDetailData.fileBoxes[0].fileName}`" alt="제품 이미지" /> -->
          
  <img class="card-img-top mb-5 mb-md-0" 
       :src="imageUrl || 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg'" 
       alt="..." />
  <div class="mt-3">
    <label for="imageUrl">제품 이미지 업로드:</label>
    <input type="file" id="imageUrl" ref="fileInput" 
    @change="handleFileUpload" />
  </div>
</div>

        <div class="col-md-6">
          <div class="fs-5 mb-5">
            
            <label for="itemName">제품명 :
              <input 
              id="itemName" 
              v-model="ItemDetailData.itemName"
              @focus="handleFocus"
              @blur="handleBlur" />
            </label>

            <label for="manuName">제조사 :
              <input id="manuName"
              v-model="ItemDetailData.manuName"
             @focus="handleFocus"
              @blur="handleBlur"
              readonly
              disabled
                />
            </label>

            <label for="itemNum">품번 :
              <input 
              id="itemNum"
                v-model="ItemDetailData.itemNum" 
                @focus="handleFocus"
                @blur="handleBlur" />
            </label>

            <label for="itemType">타입 :
              <input 
              id="itemType"
                v-model="ItemDetailData.itemType" 
                @focus="handleFocus"
                @blur="handleBlur" />
            </label>

            <label for="itemUse">제품 용도 :
              <input 
              id="itemUse"
               v-model="ItemDetailData.itemUse" 
               @focus="handleFocus"
                @blur="handleBlur" />
            </label>

            <label for="itemOutColor">색상(외부) :
              <input 
              id="itemOutColor"
                v-model="ItemDetailData.itemOutColor" 
                @focus="handleFocus"
                @blur="handleBlur" />
            </label>

            <label for="itemInColor">색상(내부) :
              <input 
              id="itemInColor"
               v-model="ItemDetailData.itemInColor"
                @focus="handleFocus"
                @blur="handleBlur" />
            </label>

            <label for="itemFrameWidth">창틀 폭(mm) :
              <input
              id="itemFrameWidth"
               v-model="ItemDetailData.itemFrameWidth" 
               @focus="handleFocus"
                @blur="handleBlur" />
            </label>

            <label for="itemSpec">유리 사용 두께(mm) :
              <input 
              id="itemSpec"
              v-model="ItemDetailData.itemSpec" 
              @focus="handleFocus"
                @blur="handleBlur" />
            </label>
            
            <label for="itemDescription">제품 설명 :
              <textarea  
              id="itemDescription"
              v-model="ItemDetailData.itemDescription"
               @focus="handleFocus"
                @blur="handleBlur" :style="{ width: '800px', height: '500px' }" />
            </label>
          
          <!-- input -->
          <p class="lead">
            아래에 체크 시 제품이 사용자에게 보여집니다. 
            버튼을 체크 하지 않으면 관리자만 해당 제품을 볼 수 있습니다.</p>
          <div class="d-flex">

            <!-- 체크박스를 통해 제품을 등록/미등록 상태로 만들지 구현 -->
            <label for="itemYN">
              <input type="radio"
              id="itemYN" 
              name="itemYN" 
              value="Y" 
              v-model="ItemDetailData.itemYN" />
              공개
            </label>

            <label for="itemYN">
              <input type="radio" 
              id="itemYN"
              name="itemYN" 
              value="N" 
              v-model="ItemDetailData.itemYN" />
              비공개
            </label>
          </div>

          <!-- <img :src="`/item/${ItemDetailData.fileBoxes[1].fileName}`" alt="제품 이미지" /> -->
        </div>
            <!-- data 전송 (미리보기 or 등록 설정)-->
            <button class="btn btn-outline-dark flex-shrink-0" type="submit">수정</button>
          </div>
        </div>
      </div>
    </form>
    </div>
  </section>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import '../../assets/styles/itemcreate.css';
export default {
  name: 'ItemEdit',
  data() {
    return {
      ItemDetailData: {},
      modifyItemId: null,
      imageUrl: null,
      fileBoxes: [],
      isMain: null,
    }

  },

  props: ['itemId'],

  created() {
    this.modifyItemId = Number(this.itemId);
    this.fetchItemDetailData(this.modifyItemId);
  },

  methods: {
    async fetchItemDetailData(itemId) {
      try {
        const response = await this.$axios.get(`/admin/items/modify?itemId=${itemId}`);
        this.ItemDetailData = response.data;
        console.log('this.ItemDetailData', this.ItemDetailData);
        this.imageUrl = `/item/${this.ItemDetailData.fileBoxes[0].fileName}` || null;
      } catch (error) {
        console.log('fetchModifyData', error);
      }
    },

    handleFileUpload(event) {
      // 파일 업로드 시만 처리하고, 데이터는 submit 때 전송
      const files = event.target.files;
      if (files.length > 0) {
        this.imageUrl = URL.createObjectURL(files[0]); // 이미지 미리보기
        this.fileBoxes = Array.from(files); // 업로드된 파일 저장
        // this.ItemDetailData.fileBoxes[0].fileName = this.imageUrl;
      }
    },

    async modifyItemData() {
      const formData = new FormData();
      
      // 기본 데이터
      formData.append("itemId", this.modifyItemId);
      formData.append("itemName", this.ItemDetailData.itemName);
      formData.append("itemNum", this.ItemDetailData.itemNum);
      formData.append("isMain", true);
      formData.append("itemType", this.ItemDetailData.itemType);
      formData.append("itemUse", this.ItemDetailData.itemUse);
      formData.append("itemOutColor", this.ItemDetailData.itemOutColor);
      formData.append("itemInColor", this.ItemDetailData.itemInColor);
      formData.append("itemFrameWidth", this.ItemDetailData.itemFrameWidth);
      formData.append("itemSpec", this.ItemDetailData.itemSpec);
      formData.append("itemDescription", this.ItemDetailData.itemDescription);
      formData.append("itemYN", this.ItemDetailData.itemYN);
      
      
      // 파일 데이터 (선택된 파일 추가)
      if (this.fileBoxes.length > 0) {
        this.fileBoxes.forEach(file => {
          formData.append("files", file);
        });
      }

      try {
        await this.$axios.post('/admin/items/update', formData, {
          
          headers: {
            'Content-Type': 'multipart/form-data', // 파일 전송 시 필요한 헤더 설정
          },
          
        });
        console.log('formData', formData);
        
        alert('수정 완료');
        window.location.href = '/admin/item';
      } catch (error) {
        console.error('fetch update failed', error);
      }
    },
  },
}
</script>

<style scoped>
</style>