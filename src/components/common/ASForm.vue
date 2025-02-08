<template>
  
  <div class="container my-5">
    <!-- 페이지 제목 -->
    <h2 class="text-center fw-bold main-title">1:1 문의 및 A/S 신청 작성</h2>
    <p class="text-center text-muted subtitle">A/S 또는 기술 관련 궁금한 사항을 문의주시면 성실하게 답변 드립니다.</p>

    <!-- 문의 유형 선택 -->
     <form action="/" method="post">
    <div class="bg-light p-4 my-4 border rounded">
      <label class="fw-bold">문의 유형을 선택해 주세요.</label>
      <select v-model="inquiryType" class="form-select mt-2">
        <option value="as">A/S 접수</option>
        <option value="general">일반 문의</option>
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
          <label>제품 구분 *</label>
          <select class="form-select">
            <option>건축재</option>
            <option>가구</option>
          </select>
        </div>
        <div class="col-md-4">
          <label>2차 구분 선택 *</label>
          <select class="form-select">
            <option>옵션 1</option>
            <option>옵션 2</option>
          </select>
        </div>
        <div class="col-md-4">
          <label>창호 부품 MAP *</label>
          <select class="form-select">
            <option>옵션 A</option>
            <option>옵션 B</option>
          </select>
        </div>
      </div>

      <!-- 문의 제목 & 내용 -->
      <input v-model="title" class="form-control my-2" placeholder="제목을 입력하세요.">
      <textarea v-model="content" class="form-control my-2" rows="4" placeholder="문의 내용을 입력하세요."></textarea>
      <small class="text-muted d-block">0/4000 byte</small>

      <!-- 파일 첨부 -->
      <div class="my-3">
        <label>파일 첨부 (선택)</label>
        <div class="d-flex">
          <input type="file" class="form-control me-2">
          <button class="btn btn-secondary">파일첨부</button>
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
          <input v-model="customer.name" class="form-control">
        </div>
        <div class="col-md-6">
          <label>연락처 *</label>
          <div class="d-flex">
            <input v-model="customer.phone1" class="form-control me-1">
            <span class="mx-1">-</span>
            <input v-model="customer.phone2" class="form-control me-1">
            <span class="mx-1">-</span>
            <input v-model="customer.phone3" class="form-control">
          </div>
        </div>
      </div>

      <div class="row my-3">
        <div class="col-md-6">
          <label>이메일 *</label>
          <div class="d-flex">
            <input v-model="customer.emailId" class="form-control me-1">
            <span class="mx-1">@</span>
            <input v-model="customer.emailDomain" class="form-control">
          </div>
        </div>
        <div class="col-md-6">
          <label>주소</label>
          <input v-model="customer.address" class="form-control">
        </div>
      </div>
    </div>

    <!-- 업체 정보 -->
    <div class="border p-4 my-4 rounded">
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
    </div>

    <!-- 개인정보 동의 -->
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="privacyCheck" v-model="this.privacyAgree">
      <label class="form-check-label" for="privacyCheck" >
        [필수] 개인정보 수집 및 이용 동의 <a href="#">자세히 보기</a>
      </label>
    </div>

    <!-- 문의 등록 버튼 -->
    <div class="text-center my-4">
      <button type="submit" class="btn btn-dark btn-lg w-50" :disabled="!this.privacyAgree">문의 등록</button>
    </div>
  </form>
  </div>
</template>

<script>
export default {
  name: "InquiryForm",
  data() {
    return {
      privacyAgree: false,

      inquiryType: "as",
      title: "",
      content: "",
      customer: {
        name: "",
        phone1: "",
        phone2: "",
        phone3: "",
        emailId: "",
        emailDomain: "",
        address: "",
      },
      company: {
        name: "",
        phone1: "",
        phone2: "",
        phone3: "",
        date: "",
        contract: "",
      }
    };
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
