<template>

  <div class="container my-5">
    <!-- 페이지 제목 -->
    <h2 class="text-center fw-bold main-title">1:1 문의</h2>
    <p class="text-center text-muted subtitle">A/S 또는 기술 관련 궁금한 사항을 문의주시면 성실하게 답변 드립니다.</p>

    <!-- 문의 유형 선택 -->
    <form @submit.prevent="postInquiry">
      <div class="bg-light p-4 my-4 border rounded">
        <label class="fw-bold">문의 유형을 선택해 주세요.</label>
        <select class="form-select mt-2">
          <option value="general">1:1 문의</option>
          <option value="as" disabled>A/S 접수 (준비 중 입니다)</option>
        </select>
        <small class="text-muted d-block mt-2">
          * 해당 사서함 성격에 맞지 않는 내용은 삭제될 수 있습니다.<br>
          * 빠른 처리가 필요한 경우 042-583-3131으로 연락 바랍니다.
        </small>
      </div>

      <!-- 문의 내용 -->
      <div class="border p-4 my-4 rounded">
        <h4 class="fw-bold section-title">문의 내용</h4>

        <!-- 제품 구분 -->
        <div class="row my-3">
          <div class="col-md-4">
            <label for="manuId">제조사 선택 *</label>
            <select id="manuId" v-model="manuId" class="form-select">
              <option value="">제조사명을 선택해주세요</option>
              <option v-for="manu in manuList" :key="manu.manuId" :value="manu.manuId">{{ manu.manuName }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="typeId">제품 타입 선택 *</label>
            <select id="typeId" v-model="typeId" class="form-select">
              <option v-for="type in typeList" :key="type.itemTypeId" :value="type.itemTypeId"> {{ type.itemTypeName }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="itemId">창호 부품 선택 *</label>
            <select id="itemId" v-model="itemId" class="form-select">
              <option v-for="items in itemNameList" :key="items.itemId" :value="items.itemId">{{ items.itemNum }}
              </option>
            </select>
          </div>
        </div>

        <!-- 문의 제목 & 내용 -->
        <input v-model="title" class="form-control my-2" placeholder="제목을 입력하세요.">
        <!-- <textarea v-model="content" class="form-control my-2" rows="4" placeholder="문의 내용을 입력하세요."></textarea> -->
        <div class="editor-container d-flex flex-column w-100">
          <CustomEditor v-model="content" class="w-100" />
        </div>

        <small class="text-muted d-block">0/4000 byte</small>

        <!-- 파일 첨부 -->
        <div class="my-3">
          <label>파일 첨부 (선택)</label>
          <div class="d-flex">
            <input type="file" multiple class="form-control me-2" @change="handleFileUpload">
          </div>
          <small class="text-muted">
            * 첨부파일: 최대 20MB 이하, 5개까지 등록 가능<br>
            * 파일형식: 문서, 이미지, 압축(zip) 파일
          </small>
        </div>
      </div>

      <!-- 고객 정보 -->
      <div class="border p-4 my-4 rounded">
        <h4 class="fw-bold section-title">고객 정보</h4>

        <div class="row">
          <div class="col-md-6">
            <label>작성자 *</label>
            <input v-model="writer" class="form-control">
          </div>
          <div class="col-md-6">
            <label>연락처 *</label>
            <div class="d-flex">
              <input v-model="tel" class="form-control me-1">
              <span class="mx-1">-</span>
              <!-- <input v-model="customer.phone2" class="form-control me-1">
            <span class="mx-1">-</span>
            <input v-model="customer.phone3" class="form-control"> -->
            </div>
          </div>
        </div>

        <div class="row my-3">
          <div class="col-md-6">
            <label>이메일 *</label>
            <div class="d-flex">
              <input v-model="emailId" class="form-control me-1">
              <span class="mx-1">@</span>
              <input v-model="emailDomain" class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <label>주소</label>
            <input v-model="postcode" class="form-control" placeholder="우편번호">
            <input v-model="addr" class="form-control" placeholder="주소">
          </div>

          <label>상세 주소</label>
          <input class="form-control" v-model="detailAddr" type="text" placeholder="상세 주소">
          <button class="btn btn-dark" type="submit" @click="openPostcodePopup">주소 검색</button><br>
        </div>
      </div>

      <!-- 업체 정보 -->
      <!-- <div class="border p-4 my-4 rounded">
      <h4 class="fw-bold section-title">업체 정보 (선택)</h4>

      <div class="row">
        <div class="col-md-6">
          <label>업체명</label>
          <input v-model="company.name" class="form-control">
        </div>
        <div class="col-md-6">
          <label>업체 연락처</label>
          <div class="d-flex">
            <input v-model="company.phone1" class="form-control me-1">
            <span class="mx-1">-</span>
            <input v-model="company.phone2" class="form-control me-1">
            <span class="mx-1">-</span>
            <input v-model="company.phone3" class="form-control">
          </div>
        </div>
      </div>

      <div class="row my-3">
        <div class="col-md-6">
          <label>시공 일자</label>
          <input type="date" v-model="company.date" class="form-control">
        </div>
        <div class="col-md-6">
          <label>계약서 유무</label>
          <div class="d-flex">
            <input type="radio" v-model="company.contract" value="있음"> 있음
            <input type="radio" v-model="company.contract" value="없음" class="ms-3"> 없음
          </div>
        </div>
      </div>
    </div> -->

      <!-- 개인정보 동의 -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="privacyCheck" v-model="this.privacyAgree">
        <label class="form-check-label" for="privacyCheck">
          [필수] 개인정보 수집 및 이용 동의 <a href="#">자세히 보기</a>
        </label>
      </div>

      <!-- 문의 등록 버튼 -->
      <div class="text-center my-4">
        <button class="btn btn-dark btn-lg w-50" :disabled="!this.privacyAgree">문의 등록</button>
      </div>
    </form>
  </div>
</template>

<script>
import CustomEditor from '../view/CustomEditor.vue';

export default {
  name: "InquiryForm",
  data() {
    return {
      privacyAgree: false,
      postcode: '',
      address: '',

      manuList: [],
      typeList: [],
      itemNameList: [],

      emailId: '',
      emailDomain: '',

      title: '',
      content: '',
      writer: '',
      tel: '',
      addr: '',
      detailAddr: '',
      itemTypeId: '',
      manuId: '',
      typeId: '',

      fileBoxes: [],
    };
  },

  setup() {
    console.log('asform 컴포넌트 호출');
  },

  async created() {
    await this.fetchManuListData();

  },

  components: {
    CustomEditor,
  },

  watch: {
    // 🔹 제조사가 변경될 때만 해당 제조사의 타입 목록 조회
    async manuId(newManuId) {
      if (newManuId) {
        await this.fetchItemTypeListData(newManuId);
      } else {
        this.itemTypeList = []; // 제조사를 선택하지 않으면 타입 리스트 초기화
      }
    },

    async typeId(newTypeId) {
      if (newTypeId) {
        await this.fetchItemNameListData(this.manuId, newTypeId);
      } else {
        this.itemNameList = [];
      }
    },
  },

  methods: {

    async fetchManuListData() {
      try {
        const response = await this.$axios.get('/manufacturers');

        this.manuList = response.data;
        console.log('this.manuList', this.manuList);

      } catch (error) {
        console.log('fetchManuListData error', error);
      }
    },

    async fetchItemTypeListData(manuId) {
      try {
        const response = await this.$axios.get(`/type?manuId=${manuId}`)
        this.typeList = response.data;
        console.log('this.typeList', this.typeList);

      } catch (error) {
        console.log('fetchItemTypeListData error', error);
      }
    },

    async fetchItemNameListData(manuId, typeId) {

      try {
        const response = await this.$axios.get(`/items/itemNum?manuId=${manuId}&typeId=${typeId}`);
        this.itemNameList = response.data;
        console.log('this.itemNameList', this.itemNameList);
      } catch (error) {
        console.log('fetchItemNameListData error', error);
      }
    },

    handleFileUpload(event) {
      const files = event.target.files;
      console.log("선택한 파일:", files);

      for (let i = 0; i < files.length; i++) {
        this.fileBoxes.push({ file: files[i] });
      }
    },

    async postInquiry() {

      const formData = new FormData();

      formData.append('title', this.title);
      formData.append('content', this.content);
      formData.append('writer', this.writer);
      formData.append('tel', this.tel);
      formData.append('email', this.emailId.concat('@' + this.emailDomain))
      formData.append('addr', this.addr);
      formData.append('detailAddr', this.detailAddr);
      formData.append('typeId', this.typeId);
      formData.append('manuId', this.manuId);
      formData.append('itemId', this.itemId);
      console.log('this.typeId', this.typeId);

      if (this.fileBoxes.length > 0) {
        this.fileBoxes.forEach((fileObject, index) => {
          console.log(`파일 ${index + 1}:`, fileObject.file);
          formData.append("files", fileObject.file);
        });
      }

      try {

        const response = await this.$axios.post('/inquiry', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        alert(response.data);
        this.$router.go(0);
        console.log('inquiry data post success');
      } catch (error) {
        console.log('postInquiry error', error);
      }
    },

    openPostcodePopup() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.postcode = data.zonecode;  // 우편번호 입력
          this.addr = data.address;  // 기본 주소 입력
        }
      }).open();
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  border: #0078ff;
  box-shadow: #0078ff;
}

.main-title {
  font-size: 24px;
}

.subtitle {
  font-size: 14px;
}

.section-title {
  border-bottom: 3px solid #0078ff;
  display: inline-block;
  padding-bottom: 5px;
}

.btn-dark {
  background-color: black;
  color: white;
}
</style>
