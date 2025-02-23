<template>
  <div class="container my-5">
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-white text-center">
        <h3 class="mb-0">제품 타입 관리</h3>
      </div>

      <div class="card-body">
        <p class="text-center text-secondary">제품 타입 등록, 변경, 삭제 페이지 입니다.</p>
        <p class="samll-type text-center">수정: 선택한 제품 타입을 수정 할 수 있습니다. 하나씩 수정해주세요.</p>
        <p class="samll-type text-center">삭제: 여러 제품 타입을 한번에 삭제 가능합니다.</p>
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
              <tr v-for="(type, index) in typeList" :key="type.itemTypeId">
                <td>
                  <input type="checkbox" class="form-check-input" v-model="selectedId" :value="type.itemTypeId" />
                </td>
                <td>{{ index + 1 }}</td>
                <td>
                  <input v-if="selectedId.includes(type.itemTypeId)" v-model="type.itemTypeName" type="text"
                    class="form-control" placeholder="제품타입 수정" @change="updateStatus(type.itemTypeId)" />
                  <span v-else>{{ type.itemTypeName }}</span>
                </td>
              </tr>

              <tr v-if="newItemType">
                <td></td>
                <td>{{ typeList.length + 1 }}</td>
                <td>
                  <input v-model="newItemType.itemTypeName" type="text" class="form-control"
                    placeholder="새로운 제품 타입 입력" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center mt-4 d-flex justify-content-center gap-2">
          <button @click="submitChanges" class="btn btn-warning btn-sm">수정하기</button>
          <button @click="submitCreate" class="btn btn-success btn-sm">새 항목 추가</button>
          <button @click="submitRegister" class="btn btn-primary btn-sm" v-if="newItemType">등록하기</button>
          <button @click="submitDelete" class="btn btn-danger btn-sm">삭제하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  name: 'Type',
  data() {
    return {
      typeList: [],
      selectedId: [],
      newItemType: null,
      UpdateItemTypeDTO: {
        itemTypeId: null,
        itemTypeName: null,
      },
    };
  },

  created() {
    this.fetchTypeListData();
  },

  methods: {
    async fetchTypeListData() {
      try {
        const response = await this.$axios.get('/admin/type');
        this.typeList = response.data;
      } catch (error) {
        console.error('fetchTypeListData error: ', error);
      }
    },

    async updateStatus(itemTypeId) {
      const selectedType = this.typeList.find(type => type.itemTypeId === itemTypeId);
      if (selectedType) {
        this.UpdateItemTypeDTO = {
          itemTypeId: selectedType.itemTypeId,
          itemTypeName: selectedType.itemTypeName,
        };
      }
    },

    async submitChanges() {
      const isConfirmed = confirm('타입 정보를 수정하시겠습니까?');

      if (isConfirmed) {
        try {
          const response = await this.$axios.post("/admin/type/update", this.UpdateItemTypeDTO, {
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
      this.newItemType = {
        itemTypeName: '',
      };
    },

    async submitRegister() {
      if (!this.newItemType.itemTypeName.trim()) {
        alert('제품 타입을 입력해주세요');
        return;
      }

      try {

        const response = await this.$axios.post(`/admin/type?itemTypeName=${this.newItemType.itemTypeName}`);
        alert(response.data);
        this.$router.go(0);
      } catch (error) {
        console.error('submitRegister error: ', error);
      }
    },

    async submitDelete() {
      if (this.selectedId.length === 0) {
        alert("삭제할 항목을 선택해주세요.");
        return;
      }

      const isConfirmed = confirm(`선택한 ${this.selectedId.length}개의 항목을 삭제 하시겠습니까?`);
      
      if (isConfirmed) {

        try {

          const response = await this.$axios.delete('/admin/type', {
            params: { itemTypeIds: this.selectedId },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" })
          });

          alert(response.data);
          this.typeList = this.typeList.filter(type => !this.selectedId.includes(type.itemTypeId));
          this.selectedId = [];
        } catch (error) {
          console.error('submitDelete error: ', error);
        }
      } else {
        alert('삭제가 취소 되었습니다.');
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
.samll-type {
  color: red;
  
}

.btn-sm {
  padding: 8px 12px;
  font-size: 0.875rem;
  border-radius: 6px;
}

.d-flex.justify-content-center {
  flex-wrap: wrap;
}
</style>