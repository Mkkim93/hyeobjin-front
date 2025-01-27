<template>
  <p>제품 등록 페이지 입니다.</p>
  <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <form @submit.prevent="postItemData">
        <div class="row gx-4 gx-lg-5 align-items-center">
          <!-- 메인 이미지 -->
          <div class="col-md-6">
            <!-- 메인 이미지 미리보기 -->
            <div class="col-md-6">
              <div class="fs-5 mb-5">

                <label for="itemName">제품명 :
                  <input :placeholder="inputValue ? '' : '제품명을 입력해주세요'" id="itemName" v-model="itemName"
                    @focus="handleFocus" @blur="handleBlur" />
                </label>

                <div class="image-container">
              <!-- <img :src="`/item/${ItemDetailData.fileBoxes[0].fileName}`" alt="제품 이미지" /> -->

              <img class="card-img-top mb-5 mb-md-0"
                :src="imageUrl || 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg'" alt="..." />
              <div class="mt-3">
                <label for="imageUrl">제품 이미지 업로드:</label>
                <input type="file" id="imageUrl" ref="fileInput" @change="handleFileUpload" />
              </div>
            </div>

                <label for="manuName">제조사 :
                  <input :placeholder="inputValue ? '' : '제조사를 입력해주세요'" id="manuName" v-model="manuName"
                    @focus="handleFocus" @blur="handleBlur" />
                </label>

                <label for="itemNum">품번 :
                  <input :placeholder="inputValue ? '' : '품번을 입력해주세요'" id="itemNum" v-model="itemNum"
                    @focus="handleFocus" @blur="handleBlur" />
                </label>

                <label for="itemType">타입 :
                  <input :placeholder="inputValue ? '' : '제품 타입을 입력해주세요'" id="itemType" v-model="itemType"
                    @focus="handleFocus" @blur="handleBlur" />
                </label>

                <label for="itemUse">제품 용도 :
                  <input :placeholder="inputValue ? '' : '제품 용도를 입력해주세요'" id="itemUse" v-model="itemUse"
                    @focus="handleFocus" @blur="handleBlur" />
                </label>

                <label for="itemOutColor">색상(외부) :
                  <input :placeholder="inputValue ? '' : '외부 색상을 입력해주세요'" id="itemOutColor" v-model="itemOutColor"
                    @focus="handleFocus" @blur="handleBlur" />
                </label>

                <label for="itemInColor">색상(내부) :
                  <input :placeholder="inputValue ? '' : '내부 색상을 입력해주세요'" id="itemInColor" v-model="itemInColor"
                    @focus="handleFocus" @blur="handleBlur" />
                </label>

                <label for="itemFrameWidth">창틀 폭(mm) :
                  <input :placeholder="inputValue ? '' : '창틀 폭(mm)을 입력해주세요'" id="itemFrameWidth"
                    v-model="itemFrameWidth" @focus="handleFocus" @blur="handleBlur" />
                </label>

                <label for="itemSpec">유리 사용 두께(mm) :
                  <input :placeholder="inputValue ? '' : '유리 사용 두께(mm)을 입력해주세요'" id="itemSpec" v-model="itemSpec"
                    @focus="handleFocus" @blur="handleBlur" />
                </label>

                <label for="itemDescription">제품 설명 :
                  <textarea :placeholder="inputValue ? '' : '제품 설명을 입력해주세요'" id="itemDescription"
                    v-model="itemDescription" @focus="handleFocus" @blur="handleBlur"
                    :style="{ width: '1000px', height: '200px' }" />
                </label>

                <!-- input -->
                <p class="lead">
                  아래에 체크 시 제품이 사용자에게 보여집니다.
                  버튼을 체크 하지 않으면 관리자만 해당 제품을 볼 수 있습니다.</p>
                <div class="d-flex">

                  <!-- 체크박스를 통해 제품을 등록/미등록 상태로 만들지 구현 -->
                  <label for="itemYN">
                    <input type="radio" id="itemYN" name="itemYN" value="Y" v-model="itemYN" />
                    공개
                  </label>

                  <label for="itemYN">
                    <input type="radio" id="itemYN" name="itemYN" value="N" v-model="itemYN" />
                    비공개
                  </label>
                  <!-- data 전송 (미리보기 or 등록 설정)-->
                  <button class="btn btn-outline-dark flex-shrink-0" type="submit">등록</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="container px-4 px-lg-5 mt-5">
      <h2 class="fw-bolder mb-4">상세 이미지</h2>
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        <div class="col mb-5">
          <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">Fancy Product</h5>
                <!-- Product price-->
                $40.00 - $80.00
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
            </div>
          </div>
        </div>
        <div class="col mb-5">
          <div class="card h-100">
            <!-- Sale badge-->
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
            <!-- Product image-->
            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">Special Item</h5>
                <!-- Product reviews-->
                <div class="d-flex justify-content-center small text-warning mb-2">
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                </div>
                <!-- Product price-->
                <span class="text-muted text-decoration-line-through">$20.00</span>
                $18.00
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
            </div>
          </div>
        </div>
        <div class="col mb-5">
          <div class="card h-100">
            <!-- Sale badge-->
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
            <!-- Product image-->
            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">Sale Item</h5>
                <!-- Product price-->
                <span class="text-muted text-decoration-line-through">$50.00</span>
                $25.00
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
            </div>
          </div>
        </div>
        <div class="col mb-5">
          <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">Popular Item</h5>
                <!-- Product reviews-->
                <div class="d-flex justify-content-center small text-warning mb-2">
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                  <div class="bi-star-fill"></div>
                </div>
                <!-- Product price-->
                $40.00
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Related items section-->
  <section class="py-5 bg-light">

  </section>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
import '../../assets/styles/itemcreate.css';

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

      CreateItemDTO: {},

      imageUrl: null,
      fileBoxes: [],


    }
  },

  setup() {
    console.log('ItemCreate 페이지가 로드되었습니다.');
  },

  methods: {

    handleFileUpload(event) {
      // 파일 업로드 시만 처리하고, 데이터는 submit 때 전송
      const files = event.target.files;
      if (files.length > 0) {
        this.imageUrl = URL.createObjectURL(files[0]); // 이미지 미리보기
        this.fileBoxes = Array.from(files); // 업로드된 파일 저장
        // this.ItemDetailData.fileBoxes[0].fileName = this.imageUrl;
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
      formData.append("isMain", true);

      if (this.fileBoxes.length > 0) {
        this.fileBoxes.forEach(file => {
          formData.append("files", file);
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
label {
  font-weight: bold;
}

.mt-3 {
  width: 100%;
}
</style>