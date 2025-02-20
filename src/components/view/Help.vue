<template>
    <section class="container py-5">
      <div class="text-center mb-5">
        <h2 class="fw-bold title">A/S 문의</h2>
        <div class="title-underline"></div>
      </div>
  
      <div class="row justify-content-center">
        <div class="col-md-5 mb-4" v-for="(contact, index) in contacts" :key="index">
          <div class="contact-card">
            <p class="description">{{ contact.description }}</p>
            <p class="phone">
              <i class="fas fa-phone-alt"></i> {{ contact.phone }}
            </p>
            <p class="hours">{{ contact.hours }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  
  export default {
    name: "Help",
    data() {
      return {
        contacts: [
          {
            description: "시공 관련 문의 및 A/S 담당자 연결",
            phone: "010 - 4951 - 4944",
            hours: "운영시간: 평일 09:00 ~ 18:00 (토/일/공휴일 휴무)"
          },
          {
            description: "사업장 문의",
            phone: "042 - 583 - 3131",
            hours: "운영시간: 평일 09:00 ~ 17:00 (토/일/공휴일 휴무)"
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .title {
    font-size: 28px;
    color: #222;
    font-weight: bold;
  }
  
  .title-underline {
    width: 50px;
    height: 4px;
    background-color: #0078ff;
    margin: 8px auto 20px;
    border-radius: 2px;
  }
  
  .contact-card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .contact-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .company-logo {
    max-width: 120px;
    margin-bottom: 15px;
  }
  
  .description {
    font-size: 16px;
    color: #444;
    margin-bottom: 10px;
  }
  
  .phone {
    font-size: 22px;
    font-weight: bold;
    color: #0078ff;
  }
  
  .hours {
    font-size: 14px;
    color: #777;
  }
  </style>
  