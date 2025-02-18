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
        <div class="editor-container">
          <Editor v-model="content" class="custom-editor" />
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
            <label>주소</label><br>
            <button class="btn btn-dark" type="button" @click="openPostcodePopup">주소 검색</button><br>

            <input v-model="postcode" class="form-control" placeholder="우편번호">
            <input v-model="addr" class="form-control" placeholder="주소">
          </div>

          <label>상세 주소</label>
          <input class="form-control" v-model="detailAddr" type="text" placeholder="상세 주소">

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
      <div class="privacy-container">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="privacyCheck" v-model="privacyAgree" />
          <label class="form-check-label" for="privacyCheck">
            <span class="bold-text">■ 개인정보 수집 및 이용 동의</span>
            <a href="#" @click.prevent="togglePrivacyDetails" class="details-link">
              자세히 보기
            </a>
          </label>
        </div>

        <!-- ✅ 클릭 시 보이도록 설정 -->
        <div v-show="showPrivacyDetails" class="privacy-details">
          <h4>개인정보 수집 및 이용 안내</h4>
          <p>
            1. 수집하는 개인정보의 항목 및 수집방법
            “회사”는 최소한의 개인정보를 수집하고 있으며, 명시된 목적 이외의 용도로는 사용되지 않습니다.
          </p>

          <p><strong>(1) 개인정보 수집 항목</strong></p>
          <ul>
            <li>① 수집·이용 목적 : AS 및 서비스 관련 문의 응대</li>
            <li>② 활용하는 개인정보(필수) : 이름, 이메일, 일반전화</li>
            <li>③ 활용하는 개인정보(선택) : 핸드폰, 주소</li>
          </ul>

          <p>
            2. 개인정보의 보유 및 이용기간
            “회사”는 이용목적이 달성된 개인정보에 대해 아래와 같이 파기합니다.
          </p>
        </div>
      </div>

      <!-- 문의 등록 버튼 -->
      <div class="text-center my-4">
        <button class="btn btn-dark btn-lg w-50" :disabled="!this.privacyAgree">문의 등록</button>
      </div>
    </form>
  </div>
</template>

<script>
import Editor from '../view/Editor.vue';
import { ref } from "vue";

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
      itemId: '',

      fileBoxes: [],
    };
  },

  setup() {
    const privacyAgree = ref(false);
    const showPrivacyDetails = ref(false);

    const togglePrivacyDetails = () => {
      showPrivacyDetails.value = !showPrivacyDetails.value;
    };

    return { privacyAgree, showPrivacyDetails, togglePrivacyDetails };
  },


  async created() {
    await this.fetchManuListData();

  },

  components: {
    Editor,
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

      console.log("📌 현재 content 값:", this.content); // ✅ 확인용 로그 추가

      if (!this.content || this.content.trim() === "") {
        alert("문의 내용을 입력하세요.");
        return;
      }

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

      console.log("📌 서버로 보낼 데이터:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); // 전송 데이터 확인
      }

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

.editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* ✅ 가운데 정렬 */
  justify-content: center;
  width: 100%;
  max-width: 800px;
  /* ✅ 부모 컨테이너 너비 제한 */
  margin: 0 auto;
  overflow: hidden;
  /* ✅ 부모를 벗어나지 않도록 */
}

.custom-editor {
  width: 100% !important;
  /* ✅ 강제로 부모 크기와 맞춤 */
  max-width: 100%;
  /* ✅ 강제로 벗어나지 않도록 */
  box-sizing: border-box;
  /* ✅ padding과 border 포함하여 크기 조정 */
  overflow-x: hidden;
  /* ✅ 가로 스크롤 방지 */
}

.ck-editor__editable {
  width: 100% !important;
  max-width: 100%;
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
}

.privacy-container {
  max-width: 600px;
  margin: 20px 0;
  font-size: 14px;
}

/* 체크박스 라벨 */
.bold-text {
  font-weight: bold;
}

/* "자세히 보기" 링크 스타일 */
.details-link {
  margin-left: 10px;
  color: #0078ff;
  text-decoration: underline;
  cursor: pointer;
}

/* 개인정보 안내 박스 */
.privacy-details {
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  overflow-y: auto;
  max-height: 200px; /* 내용이 많을 경우 스크롤 가능 */
}

/* 리스트 스타일 */
.privacy-details ul {
  padding-left: 20px;
}

.privacy-details li {
  margin-bottom: 5px;
}
</style>
