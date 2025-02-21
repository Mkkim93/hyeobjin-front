<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white text-center">
        <h3 class="mb-0">유리사양 관리</h3>
      </div>

      <div class="card-body">
        <p class="text-center text-secondary">유리 사양 등록, 변경, 삭제페이지 입니다.</p>
        <p class="samll-glass text-center">선택한 유리 사양 을 수정 할 수 있습니다. 하나씩 수정해주세요.</p>
        <p class="samll-glass text-center">삭제: 여러 유리 사양을 한번에 삭제 가능합니다.</p>
        <div class="table-responsive">
          <table class="table table-hover text-center">
            <thead class="table-light">
              <tr>
                <th></th>
                <th>No.</th>
                <th>유리 사양</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(glass, index) in glassList" :key="glass.glassSpecId">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedId" :value="glass.glassSpecId" />
                </td>
                <td>{{ index + 1 }}</td>
                <td>
                  <input v-if="selectedId.includes(glass.glassSpecId)" v-model="glass.glassSpecSize" type="text"
                    class="form-control" placeholder="유리사양 수정" @change="updateStatus(glass.glassSpecId)" />
                  <span v-else>{{ glass.glassSpecSize }}</span>
                </td>
              </tr>

              <tr v-if="newGlassSpec">
                <td></td>
                <td>{{ glassList.length + 1 }}</td>
                <td>
                  <input v-model="newGlassSpec.glassSpecSize" type="text" class="form-control"
                    placeholder="새로운 유리사양 입력" />
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div class="text-center mt-4 d-flex justify-content-center gap-2">
          <button @click="submitChanges" class="btn btn-warning btn-sm">수정하기</button>
          <button @click="submitCreate" class="btn btn-success btn-sm">새 항목 추가</button>
          <button @click="submitRegister" class="btn btn-primary btn-sm" v-if="newGlassSpec">등록하기</button>
          <button @click="submitDelete" class="btn btn-danger btn-sm">삭제하기</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'Glass',
  data() {
    return {
      glassList: [],
      selectedId: [],
      newGlassSpec: null,
      updateGlassSpecDTO: {
        glassSpecId: null,
        updateGlassSize: null,
      }
    };
  },

  created() {
    this.fetchGlassSpecData();
  },

  methods: {
    async fetchGlassSpecData() {
      try {
        const response = await this.$axios.get('/admin/glass');
        this.glassList = response.data;
      } catch (error) {
        console.error('fetchGlassSpecData error: ', error);
      }
    },

    async updateStatus(glassSpecId) {
      const selectedType = this.glassList.find(glass => glass.glassSpecId === glassSpecId);
      if (selectedType) {
        this.updateGlassSpecDTO = {
          glassSpecId: selectedType.glassSpecId,
          updateGlassSize: selectedType.glassSpecSize,
        };
      }
    },

    async submitChanges() {

      const isConfirmed = confirm('타입 정보를 수정하시겠습니까?');

      if (isConfirmed) {
        try {
          const response = await this.$axios.post("/admin/glass/update", this.updateGlassSpecDTO, {
            headers: { 'Content-Type': 'application/json' }
          });

          alert(response.data);
          this.$router.go(0);
        } catch (error) {
          console.error('submitChanges error: ', error);
        }
      } else {
        alert('취소 되었습니다.');
      }
    },

    async submitCreate() {
      this.newGlassSpec = {
        glassSpecSize: '',
      };
    },

    async submitRegister() {
      if (!this.newGlassSpec.glassSpecSize.trim()) {
        alert('유리 사양을 입력해주세요.');
        return;
      }

      try {
        const response = await this.$axios.post(`/admin/glass?newGlassSpec=${this.newGlassSpec.glassSpecSize}`);
        alert(response.data);

        this.$router.go(0);
      }

      catch (error) {
        console.error('submitRegister error:', error);
      }
    },

    async submitDelete() {
      if (this.selectedId.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }

      const isConfirmed = confirm(`선택한 ${this.selectedId.length}개의 항목을 삭제하시겠습니까?`);
      if (!isConfirmed) return;

      try {
        await this.$axios.delete("/admin/glass", {
          params: { deletedIds: this.selectedId }, // ✅ 배열 그대로 전달
          paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" }) // ✅ 배열을 URL에서 반복 형식으로 변환
        });

        alert("삭제되었습니다.");
        this.glassList = this.glassList.filter(glass => !this.selectedId.includes(glass.glassSpecId));
        this.selectedId = []; // 선택한 목록 초기화
      } catch (error) {
        console.error('submitDelete error:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
  margin-top: 20px;
  text-align: center;
}

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

.btn {
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
}

.samll-glass {
  color: red;

}

.btn-sm {
  padding: 8px 12px;
  font-size: 0.875rem; /* 버튼 글씨 크기 줄이기 */
  border-radius: 6px;
}

.d-flex.justify-content-center {
  flex-wrap: wrap; /* 화면이 작아지면 줄바꿈 되도록 설정 */
}

</style>