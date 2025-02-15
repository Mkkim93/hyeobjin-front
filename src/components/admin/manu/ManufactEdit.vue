<template>
    <div class="container my-5">
      <div class="card shadow-sm">
        <div class="card-header bg-dark text-white text-center">
          <h3 class="mb-0">제조사 수정</h3>
        </div>
  
        <div class="card-body">
          <p class="text-center text-secondary">제조사명 변경 및 등록/미등록 상태를 설정하세요.</p>
  
          <!-- 테이블 -->
          <div class="table-responsive">
            <table class="table table-hover text-center">
              <thead class="table-light">
                <tr>
                  <th><input type="checkbox" @click="selectAll" /></th>
                  <th>No.</th>
                  <th>제조사명</th>
                  <th>등록된 제품 수</th>
                  <th>등록 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(manu, index) in ManufactListData" :key="manu.manuId">
                  <td>
                    <input type="checkbox" class="form-check-input" v-model="selectedIds" :value="manu.manuId" />
                  </td>
                  <td>{{ index + 1 }}</td>
                  <td>
                    <input
                      v-if="selectedIds.includes(manu.manuId)"
                      v-model="manu.manuName"
                      type="text"
                      class="form-control"
                      placeholder="제조사명 수정"
                      @change="updateStatus(manu)"
                    />
                    <span v-else>{{ manu.manuName }}</span>
                  </td>
                  <td>{{ manu.itemCount }}</td>
                  <td>
                    <select
                      v-if="selectedIds.includes(manu.manuId)"
                      v-model="manu.manuYN"
                      class="form-select"
                      @change="updateStatus(manu)"
                    >
                      <option value="Y">✅ 등록</option>
                      <option value="N">❌ 미등록</option>
                    </select>
                    <span v-else>{{ manu.manuYN === 'Y' ? '✅ 등록' : '❌ 미등록' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- 수정 버튼 -->
          <div class="text-center mt-4">
            <button @click="submitChanges" class="btn btn-warning w-50">수정하기</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ManufactEdit",
  
    data() {
      return {
        selectedIds: [], // 선택된 체크박스의 manuId 저장
  
        manufactureDTO: {
          manuId: null,
          manuName: null,
          manuYN: null,
        },
      };
    },
  
    props: {
      ManufactListData: Array, // 제조사 리스트
    },
  
    methods: {
      // 등록 여부 변경 시 호출되는 메서드
      updateStatus(manu) {
        this.manufactureDTO = {
          manuId: manu.manuId,
          manuName: manu.manuName,
          manuYN: manu.manuYN,
        };
      },
  
      async submitChanges() {
        const isConfirmed = confirm("수정하시겠습니까?");
  
        if (isConfirmed) {
          try {
            const response = await this.$axios.post("/admin/manu/update", this.manufactureDTO, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("response", response);
            alert("제조사 정보가 수정되었습니다.");
            this.$router.push("/admin/manu"); // ✅ 페이지 이동
          } catch (error) {
            console.log("데이터 수정 실패", error);
          }
        } else {
          alert("취소되었습니다.");
        }
      },
  
      // 모든 체크박스를 선택하는 기능
      selectAll() {
        if (this.selectedIds.length === this.ManufactListData.length) {
          this.selectedIds = [];
        } else {
          this.selectedIds = this.ManufactListData.map((manu) => manu.manuId);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* ✅ 컨테이너 정렬 */
  .container {
    max-width: 900px;
  }
  
  /* ✅ 카드 스타일 */
  .card {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* ✅ 테이블 스타일 */
  .table {
    margin-top: 20px;
    text-align: center;
  }
  
  /* ✅ 입력 필드 스타일 */
  .form-control {
    border-radius: 8px;
    padding: 8px;
    font-size: 1rem;
  }
  
  .form-select {
    border-radius: 8px;
    padding: 8px;
    font-size: 1rem;
  }
  
  /* ✅ 버튼 스타일 */
  .btn {
    padding: 12px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
  }
  
  /* ✅ 반응형 */
  @media (max-width: 768px) {
    .container {
      max-width: 100%;
    }
  }
  </style>
  