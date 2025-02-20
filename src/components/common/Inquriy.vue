<template>

  <div class="container my-5">
    <h2 class="text-center fw-bold main-title">1:1 문의</h2>
    <p class="text-center text-muted subtitle">A/S 또는 시공 관련 궁금한 사항을 문의주시면 성실하게 답변 드립니다.</p>

    <form @submit.prevent="postInquiry">
      <div class="bg-light p-4 my-4 border rounded">
        <label for="inquiryType" class="fw-bold">문의 유형을 선택해 주세요.</label>
        <select class="form-select mt-2">
          <option value="general">1:1 문의</option>
          <option value="as" disabled>A/S 접수 (준비 중 입니다)</option>
        </select>
        <small class="text-muted d-block mt-2">
          * 해당 사서함 성격에 맞지 않는 내용은 삭제될 수 있습니다.<br>
          * 빠른 처리가 필요한 경우 042-583-3131으로 연락 바랍니다.
        </small>
      </div>

      <div class="border p-4 my-4 rounded">
        <h4 class="fw-bold section-title">문의 내용</h4>

        <div class="row my-3">
          <div class="col-md-4">
            <label for="manuId">제조사 선택</label>
            <select id="manuId" v-model="manuId" class="form-select">
              <option value="">제조사명을 선택해주세요</option>
              <option v-for="manu in manuList" :key="manu.manuId" :value="manu.manuId">{{ manu.manuName }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="typeId">제품 타입 선택</label>
            <select id="typeId" v-model="typeId" class="form-select">
              <option v-for="type in typeList" :key="type.itemTypeId" :value="type.itemTypeId"> {{ type.itemTypeName }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="itemId">창호 부품 선택</label>
            <select id="itemId" v-model="itemId" class="form-select">
              <option v-for="items in itemNameList" :key="items.itemId" :value="items.itemId">{{ items.itemNum }}
              </option>
            </select>
          </div>
        </div>

        <input v-model="title" class="form-control my-2" placeholder="제목을 입력하세요.">
        <div class="editor-container">
          <Editor v-model="content" class="custom-editor" />
        </div>

        <small class="text-muted d-block">0/4000 byte</small>
        
        <div class="my-3">
          <label for="fileBoxes">파일 첨부 (선택)</label>
          <div class="d-flex">
            <input id="fileBoxes" type="file" multiple class="form-control me-2" @change="handleFileUpload">
          </div>
          <small class="text-muted">
            * 첨부파일: 최대 20MB 이하, 5개까지 등록 가능<br>
            * 파일형식: 문서, 이미지, 압축(zip) 파일
          </small>
        </div>
      </div>

      <div class="border p-4 my-4 rounded">
        <h4 class="fw-bold section-title">고객 정보</h4>

        <div class="row">
          <div class="col-md-6">
            <label for="writer">작성자 *</label>
            <input id="writer" v-model="writer" class="form-control">
          </div>
          <div class="col-md-6">
            <label for="tel">연락처 *</label>
            <div class="d-flex">
              <input id="tel" v-model="tel" class="form-control me-1">
              <span class="mx-1">-</span>
            </div>
          </div>
        </div>

        <div class="row my-3">
          <div class="col-md-6">
            <label for="emailId">이메일</label>
            <div class="d-flex">
              <input id="emailId" v-model="emailId" class="form-control me-1">
              <span class="mx-1">@</span>
              <input v-model="emailDomain" class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <label for="addr">주소</label><br>
            <button class="btn btn-dark" type="button" @click="openPostcodePopup">주소 검색</button><br>

            <input v-model="postcode" class="form-control" placeholder="우편번호">
            <input id="addr" v-model="addr" class="form-control" placeholder="주소">
          </div>

          <label for="detailAddr">상세 주소</label>
          <input id="detailAddr" class="form-control" v-model="detailAddr" type="text" placeholder="상세 주소">
        </div>
      </div>

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

      <div class="text-center my-4">
        <button class="btn btn-dark btn-lg w-50" :disabled="!this.privacyAgree">문의 하기</button>
      </div>
    </form>
  </div>
</template>

<script>
import Editor from '../view/Editor.vue';
import { ref } from "vue";

export default {
  name: "Inquriy",
  data() {
    return {

      manuList: [],
      typeList: [],
      itemNameList: [],
      fileBoxes: [],

      privacyAgree: false,
      postcode: '',
      address: '',
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

    async manuId(newManuId) {
      if (newManuId) {
        await this.fetchItemTypeListData(newManuId);
      } else {
        this.itemTypeList = [];
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

      } catch (error) {
        console.error('fetchManuListData error', error);
      }
    },

    async fetchItemTypeListData(manuId) {

      try {
        const response = await this.$axios.get(`/type?manuId=${manuId}`);

        this.typeList = response.data;

      } catch (error) {
        console.error('fetchItemTypeListData error', error);
      }
    },

    async fetchItemNameListData(manuId, typeId) {

      try {
        const response = await this.$axios.get(`/items/itemNum?manuId=${manuId}&typeId=${typeId}`);
        this.itemNameList = response.data;
      } catch (error) {
        console.error('fetchItemNameListData error', error);
      }
    },

    handleFileUpload(event) {

      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.fileBoxes.push({ file: files[i] });
      }

    },

    async postInquiry() {

      if (!this.content || this.content.trim() === "") {
        alert("문의 내용을 입력하세요.");
        return;
      }
      
      if (!this.title || this.title.trim() === "") {
        alert("문의 제목을 입력하세요.");
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

      if (this.fileBoxes.length > 0) {
        this.fileBoxes.forEach((fileObject) => {
          formData.append("files", fileObject.file);
        });
      }

      if (!this.writer && !this.tel) {
        alert('작성자, 연락처는 필수 입력 사항입니다.');
        return;
      }

      const isConfirmed = confirm('문의를 등록 하시겠습니까?');

      if (isConfirmed) {
        try {

          const response = await this.$axios.post('/inquiry', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })

          alert(response.data);

          this.$router.go(0);
        } catch (error) {
          console.error('postInquiry error', error);
        }
      } else {
        alert('취소 되었습니다.');
        return;
      }
    },

    openPostcodePopup() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.postcode = data.zonecode;
          this.addr = data.address;
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
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.custom-editor {
  width: 100% !important;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
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

.bold-text {
  font-weight: bold;
}

.details-link {
  margin-left: 10px;
  color: #0078ff;
  text-decoration: underline;
  cursor: pointer;
}

.privacy-details {
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  overflow-y: auto;
  max-height: 200px;
}

.privacy-details ul {
  padding-left: 20px;
}

.privacy-details li {
  margin-bottom: 5px;
}
</style>
